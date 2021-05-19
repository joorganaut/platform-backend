import { io } from 'socket.io-client'


const socket = io('localhost', { transports: ['websocket'] }).connect()

export const get = <T = any>(name: string, callback: Function) => {
    socket.on(name, (value: any) => {
        callback(value)
    })
}

export const set = <T = any>(name: string, value: any) => {
    socket.emit(name, value as T)
}