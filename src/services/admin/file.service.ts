import { s3 } from './storage/s3.storage'
import { BadRequestError } from '../../lib'
import { MimeTypes, MimeType, UploadFile } from '../../types/admin/file.types'


const s3Storage = s3({
    bucket: process.env.AWS_BUCKET_NAME || '',
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || ''
})

export const isFileValid = (document: UploadFile) => {
    if (!document.file) {
        throw new BadRequestError(__filename, 'No file property provided')
    }

    const mime = MimeTypes.find((mimeType) => mimeType.fileType === document.fileType)
    if (!mime) {
        throw new BadRequestError(__filename, `${document.fileType} is an invalid file type`)
    }
}

export const handleFileUpload = async (document: UploadFile): Promise<string> => {

    isFileValid(document)
    const fileContent = document.file?.split(',')[1] as string
    const contentType = MimeTypes.find((mimeType: MimeType) => mimeType.fileType === document.fileType as string)
    const storedFile = await s3Storage.store(
        `${document.folder}${document.name}-${Date.now()}.${document.fileType}`,
        Buffer.from(fileContent, 'base64'),
        { ContentType: contentType?.mime }
    )

    // update the object before returning
    return storedFile.path
}

export const handleFileDelete = async (document: UploadFile): Promise<boolean> => {

    const path = document.fileUrl?.split('.com')[1].substring(1)
    return await s3Storage.destroy(path)
}

export const handleSignedUrl = async (document: UploadFile): Promise<string> => {

    if (!document.fileUrl) return ''

    const key = document.fileUrl.split('.com')[1].substring(1)
    const signedUrl = await s3Storage.getSignedUrl('getObject', {
        Bucket: process.env.AWS_BUCKET_NAME || '',
        Key: key,
        Expires: 10
    })

    return signedUrl
}

export const handleListAsset = async (assetType: string): Promise<any> => {
    let prefix = ''
    switch (assetType) {
        case 'music':
            prefix = 'media/music/'
            break
        default:
            prefix = ''
            break
    }

    const result = await s3Storage.listObjectsFromPath({ Prefix: prefix, Bucket: process.env.AWS_BUCKET_NAME || '' })
    return result
}