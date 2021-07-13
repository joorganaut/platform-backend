import { Message, MessageEntity } from '../../types'

export const mapMessageFromMessageEntity = (entity: MessageEntity): Message => {

    return {
        id: entity.id,
        senderId: entity.sender_id,
        receiverId: entity.receiver_id,
        status: entity.status,
        content: JSON.parse(entity.content as string) || entity.content,
    }
}

export const mapMessageEntityFromMessage = (message: Message): MessageEntity => {

    return {
        sender_id: message.senderId,
        receiver_id: message.receiverId,
        status: message.status,
        content: JSON.stringify(message.content) || message.content
    }
}