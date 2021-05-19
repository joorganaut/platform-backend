import { Entity, BusinessObject } from "../admin/default.types"

export interface PartnerEvent extends BusinessObject {
    id?: string
    partnerId: string
    eventId: string
}

export interface PartnerEventEntity extends Entity {
    id?: string
    partner_id: string
    event_id: string
}