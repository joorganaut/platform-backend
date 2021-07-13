import { Context } from 'koa'
import { Message } from '../../types'
import * as messageService from '../../services/messages/messages.service'

export const getMessagesByReceiver = async (ctx: Context) => {
    const { receiverId } = ctx.params
    const result: Message[] = await messageService.fetchMessagesByReceiver(receiverId)
    ctx.body =  result
}

export const getMessagesBySender = async (ctx: Context) => {
    const { senderId } = ctx.params
    const result: Message[] = await messageService.fetchMessagesBySender(senderId)
    ctx.body =  result
}

export const createMessage = async (ctx: Context) => {
    const { senderId, receiverId } = ctx.params
    const message = await messageService.createMessage(ctx.request.body, senderId, receiverId)
    ctx.body = message
}

export const updateMessage = async (ctx: Context) => {
    const { messageId } = ctx.params
    const message = await messageService.updateMessage(messageId, ctx.request.body)
    ctx.body = message
}

export const deleteMessage = async (ctx: Context) => {
    const { messageId } = ctx.params
    const message = await messageService.deleteMessage(messageId)
    ctx.body = message
}

export const deleteConversation = async (ctx: Context) => {
    const { senderId, receiverId } = ctx.params
    const messages = await messageService.deleteAllMessageBySenderAndReceiver(senderId, receiverId)
    ctx.body = messages
}