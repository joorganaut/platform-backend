import * as redis from 'redis'

export const config = {
    host: process.env.REDIS_HOST,
    port: parseInt(process.env.REDIS_PORT as string) || 6379,
    password: process.env.REDIS_PASSWORD || ''
}

export const client = redis.createClient(config)