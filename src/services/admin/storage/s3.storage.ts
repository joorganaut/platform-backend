import { StorageEngine } from './storage'
import AWS from 'aws-sdk'

export interface S3StorageEngine extends StorageEngine {
    readonly bucket: string
    getSignedUrl: (operation: string, params: { Bucket: string, Key: string, Expires: number }) => Promise<string>
}

interface S3Config {
    bucket: string
    accessKeyId: string
    secretAccessKey: string
}

export const s3 = (config: S3Config): S3StorageEngine => {
    const backend = new AWS.S3({
        accessKeyId: config.accessKeyId,
        secretAccessKey: config.secretAccessKey
    })
    const getSignedUrl = (operation: string, params: { Bucket: string, Key: string, Expires: number }): Promise<string> =>
        new Promise((resolve, reject) => backend.getSignedUrl(operation, params, (err, url) => (err ? reject(err) : resolve(url))))

    const getObject = (request: AWS.S3.GetObjectRequest): Promise<AWS.S3.GetObjectOutput> =>
        new Promise((resolve, reject) => backend.getObject(request, (err, data) => (err ? reject(err) : resolve(data))))

    const upload = (request: AWS.S3.PutObjectRequest): Promise<AWS.S3.PutObjectOutput> =>
        new Promise((resolve, reject) => backend.upload(request, (err, data) => (err ? reject(err) : resolve(data))))

    const destroy = (request: AWS.S3.DeleteObjectRequest): Promise<boolean> =>
        new Promise((resolve, reject) => backend.deleteObject(request, (err) => (err ? reject(err) : resolve(true))))

    const listObjectsFromPath = (request: AWS.S3.ListObjectsRequest): Promise<AWS.S3.ListObjectsOutput> =>
        new Promise((resolve, reject) => backend.listObjects(request, (err, data) => (err ? reject(err) : resolve(data))))

    return {
        bucket: config.bucket,
        getSignedUrl: async (operation: string, params: { Bucket: string, Key: string, Expires: number }) =>
            await getSignedUrl(operation, params),
        store: async (filename, body, options) => {
            await upload({
                Bucket: config.bucket,
                Key: filename,
                Body: body,
                ACL: 'public-read',
                ...options
            })

            return {
                path: `https://${config.bucket}.s3.amazonaws.com/${filename}`
            }
        },
        retrieve: async (path) => {
            const result = await getObject({ Bucket: config.bucket, Key: path })

            return {
                body: result.Body as Buffer
            }
        },
        destroy: async (path) => {
            const result = await destroy({ Bucket: config.bucket, Key: path })
            return result
        },
        listObjectsFromPath: async (path) => {
            const result = await listObjectsFromPath({ Bucket: config.bucket, Delimiter: '', Prefix: path.Prefix })
            return result
        }
    }
}
