import * as winston from 'winston'
import { LogBody, SourceBody, MetadataBody } from './types'

type LogLevels = 'info' | 'warn' | 'error' | 'fatal'

// There is an identical interface defined in the errors library
// It has been duplicated here to decouple the libraries
interface AdditionalInfo {
  applicationId?: string
  carrierId?: string
  productGroupId?: number
  productId?: number
  contactId?: string
  contactName?: string
}

// Instantiates a Winston logger
const BPTNLogger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.Console({
      level: 'info',
      stderrLevels: ['info', 'warn', 'error', 'fatal'],
      format: winston.format.combine(
        winston.format.timestamp({
          format: 'YYYY-MM-DD HH:mm:ss ZZ UTC'
        }),
        winston.format.colorize(),
        winston.format.simple()
      )
    })
  ]
})

export const log = (
  logLevel: LogLevels,
  logBody: LogBody,
  additionalInfo?: AdditionalInfo,
  sourceBody?: SourceBody,
  metadataBody?: MetadataBody
) => {
  const log = {
    logLevel,
    metadata: metadataBody || {},
    source: sourceBody || {},
    log: logBody,
    additional: additionalInfo || {}
  }
  if (process.env.NODE_ENV !== 'test') {
    BPTNLogger.log(logLevel, JSON.stringify(log))
  }
}
