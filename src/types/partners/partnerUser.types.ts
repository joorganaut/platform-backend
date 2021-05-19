import { Entity, BusinessObject } from "../admin/default.types"

export interface PartnerUser extends BusinessObject {
    id?: string
    partnerId: string
    userId: string
}

export interface PartnerUserEntity extends Entity {
    id?: string
    partner_id: string
    user_id: string
}