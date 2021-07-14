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
    status: string
    error: string
    content: any[]

}

export interface MessageEntity extends Entity {
    id?: string
    title: string
    sender_id: string
    receiver_id: string
    status: string
    error: string
    content: string | any[]

}