import { db } from '../../server/db'
import { MessageEntity } from '../../types'

const TABLE_NAME = 'messages'

const columns = [
    'id',
    'sender_id',
    'receiver_id',
    'status',
    'content',
    'deleted_at',
    'created_at',
    'updated_at'
]

export const fetchMessagesByReceiver = async (receiverId: string): Promise<MessageEntity[]> => await db<MessageEntity>(TABLE_NAME).whereNull('deleted_at').where('receiver_id', receiverId).select(columns)

export const fetchMessagesBySender = async (senderId: string): Promise<MessageEntity[]> => await db<MessageEntity>(TABLE_NAME).whereNull('deleted_at').where('sender_id', senderId).select(columns)

export const createMessage = async (message: MessageEntity): Promise<MessageEntity[]> => await db<MessageEntity>(TABLE_NAME).insert({ ...message, updated_at: db.raw('now()'), created_at: db.raw('now()') }, columns)

export const updateMessage = async (messageId: string, message: MessageEntity): Promise<MessageEntity[]> => await db<MessageEntity>(TABLE_NAME)
    .where('id', messageId)
    .whereNull('deleted_at')
    .update({ ...message, updated_at: db.raw('now()') }, columns)

export const deleteMessage = async (messageId: string): Promise<MessageEntity[]> => await db<MessageEntity>(TABLE_NAME)
    .where('id', messageId)
    .update({ updated_at: db.raw('now()'), deleted_at: db.raw('now()') }, columns)

export const deleteAllMessageBySenderAndReceiver = async (senderId: string, receiverId: string): Promise<MessageEntity[]> => await db<MessageEntity>(TABLE_NAME)
    .where({'sender_id': senderId, 'receiver_id': receiverId})
    .update({ updated_at: db.raw('now()'), deleted_at: db.raw('now()') }, columns)