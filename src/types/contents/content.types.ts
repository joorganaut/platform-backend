import { Entity, BusinessObject } from "../admin/default.types"

export interface Content extends BusinessObject {
    id?: string
    status: string
    type: string
    title:string
    content: string
    media: string
    flagged: boolean
    reports: string[]
}

export interface ContentEntity extends Entity {
    id?: string
    status: string
    type: string
    title:string
    content: string
    media: string
    flagged: boolean
    reports: string[]
}