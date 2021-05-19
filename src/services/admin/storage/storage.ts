export type Body = string | Buffer | Uint8Array | Blob | undefined

export interface StoreResult {
    path: string
}

export interface RetrieveResult {
    body: Buffer
}

export interface StorageEngine {
    getSignedUrl: (operation: string, params: { Bucket: string, Key: string, Expires: number }) => Promise<string>
    store: (filename: string, body: Body, options?: object) => Promise<StoreResult>
    retrieve: (path: string) => Promise<RetrieveResult>
    destroy: (path: string) => Promise<boolean>
    listObjectsFromPath: (request: AWS.S3.ListObjectsRequest) => Promise<AWS.S3.ListObjectsOutput>

}
