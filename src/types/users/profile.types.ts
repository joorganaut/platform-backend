import { Entity, BusinessObject } from "../admin/default.types"

export interface Profile extends BusinessObject {
    id?: string
    userId: string
    location: string
    bio: string
    avatar: string
    title: string
    industry: string
    handler: string
}

export interface ProfileEntity extends Entity {
    id?: string
    user_id: string
    location: string
    bio: string
    avatar: string
    title: string
    industry: string
    handler: string

}