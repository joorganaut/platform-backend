import { PartnerEvent, PartnerEventEntity } from '../../types'
import * as partnerEventsRepository from '../../repositories/partners/partnerEvents.repository'
import { mapPartnerEventFromPartnerEventEntity, mapPartnerEventEntityFromPartnerEvent } from '../../dataMappers/partners/partnersEvents.mappers'
import { NotFoundError } from '../../lib'

export const fetchPartnerEvents = async (): Promise<PartnerEvent[]> => {
    const partnerEvents: PartnerEventEntity[] = await partnerEventsRepository.fetchPartnerEvents()

    return partnerEvents.map(partnerEvent => mapPartnerEventFromPartnerEventEntity(partnerEvent))
}

export const fetchPartnerEventById = async (partnerId: string, partnerEventId: string): Promise<PartnerEvent> => {
    const partnerEvent: PartnerEventEntity = await partnerEventsRepository.fetchPartnerEventById(partnerId, partnerEventId)

    if (!partnerEvent) {
        throw new NotFoundError(__filename, `Partner Event ID ${partnerEventId} does not exist`)
    }

    return mapPartnerEventFromPartnerEventEntity(partnerEvent)
}

export const findPartnerEventByEventId = async (eventId: string): Promise<PartnerEvent | null> => {
    const partnerEvent = await partnerEventsRepository.fetchPartnerEventByEventID(eventId)
    if (!partnerEvent) {
        return null
    }

    return mapPartnerEventFromPartnerEventEntity(partnerEvent)
}

export const findPartnerEventByPartnerId = async (partnerId: string): Promise<PartnerEvent | null> => {
    const partnerEvent = await partnerEventsRepository.fetchPartnerEventByPartnerID(partnerId)
    if (!partnerEvent) {
        return null
    }

    return mapPartnerEventFromPartnerEventEntity(partnerEvent)
}

export const createPartnerEvent = async (partnerEvent: PartnerEvent): Promise<PartnerEvent> => {
    const existingPartnerEventByEventId = await findPartnerEventByEventId(partnerEvent.eventId)
    const existingPartnerEventByPartnerId = await findPartnerEventByPartnerId(partnerEvent.partnerId)
    if (existingPartnerEventByEventId && existingPartnerEventByPartnerId) {
        return existingPartnerEventByEventId
    }
    const partnerEventEntity = mapPartnerEventEntityFromPartnerEvent(partnerEvent)
    const [db_response] = await partnerEventsRepository.createPartnerEvent(partnerEventEntity)

    return mapPartnerEventFromPartnerEventEntity(db_response)
}

export const updatePartnerEvent = async (partnerId: string, partnerEventId: string,  partnerEvent: PartnerEvent): Promise<PartnerEvent> => {
    const partnerEventEntity = mapPartnerEventEntityFromPartnerEvent(partnerEvent)
    const [db_response] = await partnerEventsRepository.updatePartnerEvent(partnerId, partnerEventId, partnerEventEntity)
    return mapPartnerEventFromPartnerEventEntity(db_response)
}

export const deletePartnerEvent = async (partnerId: string, partnerEventId: string): Promise<PartnerEvent> => {
    const [db_response] = await partnerEventsRepository.deletePartnerEvent(partnerId, partnerEventId)
    return mapPartnerEventFromPartnerEventEntity(db_response)
}