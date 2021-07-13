export interface UploadFile {
    name: string
    type: string
    file?: string // the incoming file upload
    fileType?: string
    fileUrl: string // the outgoing S3 url
    folder: string | '/'
}

export interface MimeType {
    fileType: string
    mime: string
}

export const MimeTypes: MimeType[] = [
    { fileType: 'pdf', mime: 'application/pdf' },
    { fileType: 'jpg', mime: 'image/jpeg' },
    { fileType: 'jpeg', mime: 'image/jpeg' },
    { fileType: 'png', mime: 'image/png' },
    { fileType: 'xls', mime: 'application/vnd.ms-excel' },
    { fileType: 'xlsx', mime: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' },
    { fileType: 'doc', mime: 'application/msword' },
    { fileType: 'docx', mime: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' },
    { fileType: 'mp4', mime: 'video/mp4' },
    { fileType: 'webm', mime: 'video/webm' },
    { fileType: 'mov', mime: 'video/mov' }
]
