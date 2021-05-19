export type MessageBody = string | RequestLogInfo | ResponseLogInfo

export interface RequestLogInfo {
  method: string
  url: string
  header: {
    host: string
  }
}

export interface ResponseLogInfo {
  message: string
  status: number
  body?: object
}

export interface ErrorBody {
  httpMessage: string
  httpStatus: number
  errMessage: string
  errCode: number
}

export interface LogBody {
  requestId: string
  class: string
  msg: MessageBody | ErrorBody
}

export interface SourceBody {
  sourceName: string
  instanceId: string
  ipAddress: string
  awsRegion: string
  env: string
}

export interface MetadataBody {
  userName?: string
  userEmail?: string
  cognitoUsername?: string
}
