require('dotenv').config()
import * as http from 'http'
import { app } from './main'
import * as logger from '../utils/logger'
import { config } from './config'
import { BPTNError } from '../lib'
import * as RedisCache from './redis/redisCache'
import * as SocketServer from '../server/socket/socket.server'

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
console.log(process.env.PORT)
const server = http.createServer(app.callback())


server.on('error', (e) => {
    console.log(e.message)
    logger.error(new BPTNError(__filename, e.message, e), __filename)
})
server.on('listening', async () => {
    console.log(`Listening on http://localhost:${PORT}`)
    logger.info(`Listening on http://localhost:${PORT}`, __filename)
})
server.on('unhandledRejectionError', (reason: string) => {
    throw reason
})
server.on('uncaughtException', (e: Error) => {
    logger.error(new BPTNError(__filename, e.message, e), __filename)
    console.log(e.message)
    process.exit(1)
})

Promise.resolve(SocketServer.socketServer(server))
server.listen(config.port);

Promise.resolve(RedisCache.prePopulateCacheWithUsers())
console.log(`Server is running at http://localhost:${config.port}/`);
