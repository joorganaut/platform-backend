import { client } from '../../server/redis/config'
import { promisify } from 'util'
import { Md5 } from 'ts-md5/dist/md5'
import * as logger from '../../utils/logger'

//logger.info(`Redis Config ${JSON.stringify(client.auth)}`, __filename)

// client.on('connect', () => {
//     logger.info('Redis client connected', __filename)
// })

// client.on('ready', () => {
//     logger.info('Redis client ready', __filename)
// })

// client.on('error', () => {
//     logger.info('Redis client error', __filename)
// })

export const fetchAll = async <T = any>(key: string): Promise<T[]> => {
    // const fetchAsync = promisify(client.GET).bind(client)
    // const result = await fetchAsync(key)
    return []//JSON.parse(result as string)
}

export const fetchById = async <T = any>(key: string, id: string): Promise<T> => {
    // const hash = Md5.hashStr(id)
    // const fetchAsync = promisify(client.HGET).bind(client)
    // const redis_response = await fetchAsync(hash as string, key)
    return {} as T //JSON.parse(redis_response) as T
}

export const create = async <T = any>(key: string, obj: T) => {
    // const hash = Md5.hashStr((obj as any).id)
    // const setAsync = promisify(client.HSET).bind(client)
    // return await setAsync([hash as string, key, JSON.stringify(obj)]) === 1 ? true : false
}

export const update = async <T = any>(key: string, obj: T) => {
    // const existing = await fetchById(key, (obj as any).id)

    // if (existing) {
    //     const newT = { ...existing, ...obj }
    //     await create(key, newT)
    // } else {
    //     await create(key, obj)
    // }
}

export const destroy = async <T = any>(key: string, id: string) => {
    // const hash = Md5.hashStr(id)
    // return Promise.resolve(client.HDEL(hash as string, key))
}