import { Entity, BusinessObject } from "../admin/default.types"

export interface PartnerContent extends BusinessObject {
    id?: string
    contentId: string
    partnerId: string
}

export interface PartnerContentEntity extends Entity {
    id?: string
    content_id: string
    partner_id: string
}