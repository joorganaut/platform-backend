import * as redis from 'redis'
import * as logger from '../../utils/logger'

export const config = {
    host: process.env.REDIS_HOST,
    port: parseInt(process.env.REDIS_PORT as string) || 6379
}

logger.info(`Redis Config ${JSON.stringify(config)}`, __filename)


export const client = redis.createClient(config)