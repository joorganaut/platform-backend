import * as http from 'http'
import { Server, Socket } from 'socket.io'
import { Content } from 'types'
import * as RedisService from '../../services/admin/redis.service'
import * as logger from '../../utils/logger'

interface FeedParams {
    userId: string
    page: number
    pageSize: number
}

interface UserParams {
    username: string
    date: string
    socket: Socket
    name: string
    avatar: string
}

interface ChatParams {
    senderId: string
    receiverId: string
    msg: string
    date: string
}

interface ActiveChat {
    author: string
    receiver: string
    id: string
    name: string
    messages?: ChatParams[]
    open?: boolean
}

interface NotifyParams {
    type: 'error' | 'success' | 'info'
    msg: string
}

const users: UserParams[] = []
const activeChats: ActiveChat[] = []
let count = 0

const notifyUser = (io: Server, socket: Socket, params: NotifyParams) => {
    io.to(socket.id).emit('notify', params)
}

export const socketServer = async (server: http.Server) => {

    const io = new Server(server)
    io.on("connection", async (socket: Socket) => {

        socket.on("username", async (user: UserParams) => {
            const existingUser = users.find(x => x.username === user.username)
            if (!existingUser) {
                users.push(user)
            }
            users[users?.indexOf(existingUser as UserParams)] = existingUser as UserParams
            logger.info(`User ${user.username} just connected :D`, __filename)

            await RedisService.create("logins", { ...user, id: user.username })
            io.emit("online", users)
        })

        socket.on("chat", async (chat: ChatParams) => {
            const existingActiveChats = activeChats.filter(x => (x.id === chat.senderId + '-' + chat.receiverId) || (x.id === chat.receiverId + '-' + chat.senderId))
            if (existingActiveChats.length < 2) {
                //get author-user
                const author = users.find(x => x.username === chat.senderId)
                //get receiver 
                const receiver = users.find(x => x.username === chat.receiverId)
                const first = activeChats.filter(x => x.id === chat.senderId + '-' + chat.receiverId)
                if (!first || first.length === 0) {
                    activeChats.push({ author: chat.senderId, receiver: chat.senderId, id: chat.senderId + '-' + chat.receiverId, name: receiver?.name as string })
                }
            }
            const existingAuthorActiveChats = activeChats.filter(x => (x.author === chat.senderId))
            existingAuthorActiveChats.forEach(x => {
                if (x.receiver === chat.receiverId) {
                    if (!x.messages) {
                        x.messages = []
                    }
                    x.messages?.push(chat)
                }
            })
            const existingReceiverActiveChats = activeChats.filter(x => (x.author === chat.receiverId))
            existingReceiverActiveChats.forEach(x => {
                if (x.receiver === chat.senderId) {
                    if (!x.messages) {
                        x.messages = []
                    }
                    x.messages?.push(chat)
                }
            })
            io.emit(`activeChat_${chat?.senderId}`, existingAuthorActiveChats)
            io.emit(`activeChat_${chat?.receiverId}`, existingReceiverActiveChats)
        })

        socket.on("addActiveChat", async (activeChat: ActiveChat) => {
            const existingActiveChats = activeChats.filter(x => (x.id === activeChat.author + '-' + activeChat.receiver) || (x.id === activeChat.receiver + '-' + activeChat.author))
            if (!existingActiveChats || existingActiveChats.length < 2) {
                //get author-user
                const author = users.find(x => x.username === activeChat.author)
                //get receiver 
                const receiver = users.find(x => x.username === activeChat.receiver)
                const first = activeChats.filter(x => x.id === activeChat.author + '-' + activeChat.receiver)
                if (!first || first.length === 0) {
                    activeChats.push({ ...activeChat, messages: [], id: activeChat.author + '-' + activeChat.receiver, name: receiver?.name as string })
                }
                const second = activeChats.filter(x => x.id === activeChat.receiver + '-' + activeChat.author)
                if (!second || second.length === 0) {
                    activeChats.push({ ...activeChat, messages: [], author: activeChat.receiver, receiver: activeChat.author, id: activeChat.receiver + '-' + activeChat.author, name: author?.name as string })
                }
            }
            const existingAuthorActiveChats = activeChats.filter(x => (x.author === activeChat.author))
            existingAuthorActiveChats.forEach(x => {
                if (x.id === activeChat.author + '-' + activeChat.receiver) {
                    x.open = true
                }
            })
            const existingReceiverActiveChats = activeChats.filter(x => x.author === activeChat.receiver)


            io.emit(`activeChat_${activeChat.author}`, existingAuthorActiveChats)
            io.emit(`activeChat_${activeChat.receiver}`, existingReceiverActiveChats)
        })

        socket.on("removeActiveChat", async (activeChat: ActiveChat) => {
            activeChats.forEach(x => {
                if (x.id === activeChat.author + '-' + activeChat.receiver) {
                    x.open = false
                }
            })
            const existingAuthorActiveChats = activeChats.filter(x => (x.author === activeChat.author))
            const existingReceiverActiveChats = activeChats.filter(x => x.author === activeChat.receiver)


            io.emit(`activeChat_${activeChat.author}`, existingAuthorActiveChats)
            io.emit(`activeChat_${activeChat.receiver}`, existingReceiverActiveChats)
        })


        socket.on("addToMessageCount", async (message: any) => {
            const user = users.find(x => x.username === message.userId)
            count++
            //TODO: get connections of user
            //TODO: emit the new feed to all connections to user

            // io.to(user.socket.id).emit('getMessageCount', count)
            io.emit(`getMessageCount_${user?.username}`, count.toString())
        })

        socket.on("addToFeed", async (feed: any) => {
            const user = users.find(x => x.username === feed.userId) as UserParams
            count++
            //TODO: get connections of user
            //TODO: emit the new feed to all connections to user

            io.to(user.socket.id).emit('getFeed', count.toString())
            // io.emit('getFeed', count.toString())
        })
    })
}