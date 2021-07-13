require('dotenv').config()
import * as http from 'http'
import { app } from './main'
import * as logger from '../utils/logger'
import { config } from './config'
import { BPTNError } from '../lib'
import * as RedisCache from './redis/redisCache'
import * as SocketServer from '../server/socket/socket.server'
import * as DataPreload from '../middleware/data.preload'
import cron from 'node-cron'

function normalizePort(val: string) {
    const port = parseInt(val, 10)

    if (isNaN(port)) {
        return val
    }
    if (port >= 0) {
        return port
    }
    return false
}
const PORT = normalizePort(process.env.PORT || '5000')
const server = http.createServer(app.callback())

cron.schedule('* * * * *', () => {
    logger.info('cron job', __filename)
})

server.on('error', (e) => {
    logger.error(new BPTNError(__filename, e.message, e), __filename)
})
server.on('listening', async () => {
    logger.info(`Listening on http://localhost:${PORT}`, __filename)
})
server.on('unhandledRejectionError', (reason: string) => {
    throw reason
})
server.on('uncaughtException', (e: Error) => {
    logger.error(new BPTNError(__filename, e.message, e), __filename)
    process.exit(1)
})

Promise.resolve(SocketServer.socketServer(server))
server.listen(config.port);
Promise.resolve(DataPreload.dataPreload())
Promise.resolve(RedisCache.prePopulateCacheWithUsers())
logger.info(`Server is running at http://localhost:${config.port}/`, __filename);
