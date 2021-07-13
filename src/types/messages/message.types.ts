import { Entity, BusinessObject } from "../admin/default.types"

export interface Message extends BusinessObject {
    id?: string
    senderId: string
    receiverId: string
    status: string
    content: any[]

}

export interface MessageEntity extends Entity {
    id?: string
    sender_id: string
    receiver_id: string
    status: string
    content: string | any[]

}