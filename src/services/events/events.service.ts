import { Event, EventEntity, PartnerEvent } from 'types'
import * as eventsRepository from '../../repositories/events/events.repository'
import { mapEventFromEventEntity, mapEventEntityFromEvent } from '../../dataMappers/events/events.mappers'
import { findPartnerUserByUserId } from '../partners/partnerUsers.service'
import { createPartnerEvent } from '../partners/partnerEvents.service'
import { NotFoundError } from '../../lib'

export const fetchEvents = async (): Promise<Event[]> => {
    const events: EventEntity[] = await eventsRepository.fetchEvents()

    return events.map(event => mapEventFromEventEntity(event))
}

export const findEventById = async (eventId: string): Promise<Event> => {
    const event: EventEntity = await eventsRepository.fetchEventById(eventId)

    if (!event) {
        throw new NotFoundError(__filename, `Event ID ${eventId} does not exist`)
    }

    return mapEventFromEventEntity(event)
}

export const createEvent = async (event: Event, userId: string): Promise<Event> => {
    const currentPartnerUser = await findPartnerUserByUserId(userId as string)
    if (currentPartnerUser) {
        const eventEntity =  mapEventEntityFromEvent(event)
        const newPartnerEvent: PartnerEvent = {
            partnerId: currentPartnerUser.partnerId as string,
            eventId: '',
        }
        const [db_response] = await eventsRepository.createEvent(eventEntity)
        newPartnerEvent.eventId = db_response.id as string
        await createPartnerEvent(newPartnerEvent)
        return mapEventFromEventEntity(db_response)
    }

    // for now any user can create an event but eventually it will be just partners (or admin)
    const eventEntity = mapEventEntityFromEvent(event)
    const [db_response] = await eventsRepository.createEvent(eventEntity)

    return mapEventFromEventEntity(db_response)
}

export const updateEvent = async (eventId: string, event: Event): Promise<Event> => {
    const eventEntity = mapEventEntityFromEvent(event)
    const[db_response] = await eventsRepository.updateEvent(eventId, eventEntity)
    return mapEventFromEventEntity(db_response)
}

export const deleteEvent = async (eventId: string): Promise<Event> => {
    const [db_response] = await eventsRepository.deleteEvent(eventId)
    return mapEventFromEventEntity(db_response)
}