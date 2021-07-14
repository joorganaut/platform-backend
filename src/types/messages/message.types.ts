import { Entity, BusinessObject } from "../admin/default.types"

export enum MessageStatus {
    sent,
    pending,
    failed
}

export interface Message extends BusinessObject {
    id?: string
    title: string
    senderId: string
    receiverId: string
    type: string
    status: MessageStatus
    error: string
    content: any[]
}

export interface MessageEntity extends Entity {
    id?: string
    title: string
    sender_id: string
    receiver_id: string
    type: string
    status: MessageStatus
    error: string
    content: string | any[]
}