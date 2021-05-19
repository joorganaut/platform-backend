import { EventAttendee, EventAttendeeEntity } from 'types'
import * as eventAttendeesRepository from '../../repositories/events/eventAttendees.repository'
import { mapEventAttendeeFromEventAttendeeEntity, mapEventAttendeeEntityFromEventAttendee } from '../../dataMappers/events/eventAttendees.mappers'
import { findProfileByUserId } from '../users/profiles.service'
import { NotFoundError, BadRequestError } from "../../lib"

export const fetchEventAttendees = async (): Promise<EventAttendee[]> => {
    const eventAttendees: EventAttendeeEntity[] = await eventAttendeesRepository.fetchEventAttendees()

    return eventAttendees.map(eventAttendee => mapEventAttendeeFromEventAttendeeEntity(eventAttendee))
}

export const fetchEventAttendeeById = async (eventId: string, eventAttendeeId: string): Promise<EventAttendee> => {
    const eventAttendee = await eventAttendeesRepository.fetchEventAttendeeById(eventId, eventAttendeeId)

    if(!eventAttendee) {
        throw new NotFoundError(__filename, `Event Attendee ID ${eventAttendeeId} does not exist`)
    }

    return mapEventAttendeeFromEventAttendeeEntity(eventAttendee)
}

export const findEventAttendeeByAttendeeId = async (attendeeId: string): Promise<EventAttendee | null> => {
    const eventAttendee = await eventAttendeesRepository.fetchEventAttendeeByAttendeeId(attendeeId)
    if(!eventAttendee) {
        return null
    }
    return mapEventAttendeeFromEventAttendeeEntity(eventAttendee)
}

export const createEventAttende = async (eventAttendee: EventAttendee, userId: string): Promise<EventAttendee> => {
    const currentUserProfile = await findProfileByUserId(userId)
    if (!currentUserProfile) {
        throw new NotFoundError(__filename, 'Profile Not Found')
    }
    
    const existingEventAttendee = await findEventAttendeeByAttendeeId(currentUserProfile.id as string)
    if (existingEventAttendee) {
        throw new BadRequestError(__filename, `This event attendee already exists`)
    }
    eventAttendee.attendeeId = currentUserProfile.id as string
    const eventAttendeeEntity = mapEventAttendeeEntityFromEventAttendee(eventAttendee)
    const [db_response] = await eventAttendeesRepository.createEventAttendee(eventAttendeeEntity)
    return mapEventAttendeeFromEventAttendeeEntity(db_response) 
}

export const updateEventAttendee = async (eventId: string, eventAttendeeId: string, eventAttendee: EventAttendee): Promise<EventAttendee> => {
    const eventAttendeeEntity = mapEventAttendeeEntityFromEventAttendee(eventAttendee)
    const [db_response] = await eventAttendeesRepository.updateEventAttendee(eventId, eventAttendeeId, eventAttendeeEntity)
    return mapEventAttendeeFromEventAttendeeEntity(db_response)
}

export const deleteEventAttendee = async (eventId: string, eventAttendeeId: string): Promise<EventAttendee> => {
    const [db_response] = await eventAttendeesRepository.deleteEventAttendee(eventId, eventAttendeeId)
    return mapEventAttendeeFromEventAttendeeEntity(db_response)
}