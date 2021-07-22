import { Message, MessageEntity, MessageStatus } from '../../types'
import * as messageRepository from '../../repositories/messages/messages.repository'
import { mapMessageFromMessageEntity, mapMessageEntityFromMessage } from '../../dataMappers/messages/messages.mappers'

const groupBy = (items: any[], key: any) =>
  items.reduce(
    (result, item) => ({
      ...result,
      [item[key]]: [...(result[item[key]] || []), item]
    }),
    {}
  )

export const fetchMessagesByReceiver = async (receiverId: string): Promise<Message[]> => {
  const messagesEntites: MessageEntity[] = await messageRepository.fetchMessagesByReceiver(receiverId)
  const messages: Message[] = messagesEntites.map((message: MessageEntity) => mapMessageFromMessageEntity(message))
  const messagesGroupedBySender = groupBy(messages, 'senderId')

  return messagesGroupedBySender
}

export const fetchMessagesBySender = async (senderId: string): Promise<Message[]> => {
  const messagesEntities: MessageEntity[] = await messageRepository.fetchMessagesBySender(senderId)
  const messages: Message[] = messagesEntities.map((message: MessageEntity) => mapMessageFromMessageEntity(message))
  const messagesGroupedByReceiver = groupBy(messages, 'receiverId')

  return messagesGroupedByReceiver
}

export const createMessage = async (message: Message, senderId: string, receiverId: string): Promise<Message> => {
  message.senderId = senderId
  message.receiverId = receiverId
  message.status = MessageStatus.pending

  const messageEntity = mapMessageEntityFromMessage(message)
  const [db_response] = await messageRepository.createMessage(messageEntity)

  return mapMessageFromMessageEntity(db_response)
}

export const updateMessage = async (messageId: string, message: Message): Promise<Message> => {
  const messageEntity = mapMessageEntityFromMessage(message)
  const [db_response] = await messageRepository.updateMessage(messageId, messageEntity)
  return mapMessageFromMessageEntity(db_response)
}

export const deleteMessage = async (messageId: string): Promise<Message> => {
  const [db_response] = await messageRepository.deleteMessage(messageId)
  return mapMessageFromMessageEntity(db_response)
}

export const deleteAllMessageBySenderAndReceiver = async (senderId: string, receiverId: string): Promise<Message[]> => {
  const deletedSenderMessages = await messageRepository.deleteAllMessageBySenderAndReceiver(senderId, receiverId)
  const deletedReceiverMessages = await messageRepository.deleteAllMessageBySenderAndReceiver(receiverId, senderId)

  const allDeletedMessages = [...deletedSenderMessages, ...deletedReceiverMessages]
  return allDeletedMessages.map(message => mapMessageFromMessageEntity(message))
}