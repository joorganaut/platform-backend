import { Entity, BusinessObject } from "../admin/default.types"

export interface UserContent extends BusinessObject {
    id?: string
    contentId: string
    profileId: string
}

export interface UserContentEntity extends Entity {
    id?: string
    content_id: string
    profile_id: string

}