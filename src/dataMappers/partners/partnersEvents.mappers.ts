import { PartnerEvent, PartnerEventEntity } from '../../types'

export const mapPartnerEventFromPartnerEventEntity = (entity: PartnerEventEntity): PartnerEvent => {

    return {
        id: entity.id,
        partnerId: entity.partner_id,
        eventId: entity.event_id
    }
}

export const mapPartnerEventEntityFromPartnerEvent = (partnerEvent: PartnerEvent): PartnerEventEntity => {
    
    return {
        partner_id: partnerEvent.partnerId,
        event_id: partnerEvent.eventId
    }
}