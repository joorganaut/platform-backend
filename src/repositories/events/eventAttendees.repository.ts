import { db } from '../../server/db'

import { EventAttendeeEntity } from '../../types'

const TABLE_NAME = 'event_attendees'

const columns = [
    'id',
    'attendee_id',
    'event_id',
    'payment_status',
    'deleted_at',
    'created_at',
    'updated_at'
]

export const fetchEventAttendees = async (): Promise<EventAttendeeEntity[]> => await db<EventAttendeeEntity>(TABLE_NAME).whereNull('deleted_at').select(columns)

export const fetchEventAttendeeById = async (eventId: string, eventAttendeeId: string): Promise<EventAttendeeEntity> => await db<EventAttendeeEntity>(TABLE_NAME).whereNull('deleted_at').where({'id': eventAttendeeId, 'event_id': eventId}).first(columns)

export const fetchEventAttendeeByAttendeeId = async (attendeeId: string): Promise<EventAttendeeEntity> => await db<EventAttendeeEntity>(TABLE_NAME).whereNull('deleted_at').where('attendee_id', attendeeId).first(columns)

export const createEventAttendee = async (eventAttendee: EventAttendeeEntity): Promise<EventAttendeeEntity[]> => await db<EventAttendeeEntity>(TABLE_NAME).insert({ ...eventAttendee, updated_at: db.raw('now()'), created_at: db.raw('now()') }, columns)

export const updateEventAttendee = async (eventId: string, eventAttendeeId: string, eventAttendee: EventAttendeeEntity): Promise<EventAttendeeEntity[]> => await db<EventAttendeeEntity>(TABLE_NAME)
    .where({'id': eventAttendeeId, 'event_id': eventId})
    .whereNull('deleted_at')
    .update({ ...eventAttendee, updated_at: db.raw('now()') }, columns)

export const deleteEventAttendee = async (eventId: string, eventAttendeeId: string): Promise<EventAttendeeEntity[]> => await db<EventAttendeeEntity>(TABLE_NAME)
    .where({'id': eventAttendeeId, 'event_id': eventId})
    .update({ updated_at: db.raw('now()'), deleted_at: db.raw('now()') }, columns)