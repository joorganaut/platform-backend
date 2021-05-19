import { db } from '../../server/db'


import { EventEntity } from '../../types'

const TABLE_NAME = 'events'

const columns = [
    'id',
    'title',
    'description',
    'speaker_details',
    'date',
    'show_key',
    'status',
    'registration_link',
    'login_link',
    'price',
    'deleted_at',
    'created_at',
    'updated_at'
]

export const fetchEvents = async (): Promise<EventEntity[]> => await db<EventEntity>(TABLE_NAME).whereNull('deleted_at').select(columns)

export const fetchEventById = async (eventId: string): Promise<EventEntity> => await db<EventEntity>(TABLE_NAME).whereNull('deleted_at').where('id', eventId).first(columns)

export const createEvent = async (event: EventEntity): Promise<EventEntity[]> => await db<EventEntity>(TABLE_NAME).insert({ ...event, updated_at: db.raw('now()'), created_at: db.raw('now()') }, columns)

export const updateEvent = async (eventId: string, event: EventEntity): Promise<EventEntity[]> => await db<EventEntity>(TABLE_NAME)
    .where('id', eventId)
    .whereNull('deleted_at')
    .update({ ...event, updated_at: db.raw('now()') }, columns)

export const deleteEvent = async (eventId: string): Promise<EventEntity[]> => await db<EventEntity>(TABLE_NAME)
    .where('id', eventId)
    .update({ updated_at: db.raw('now()'), deleted_at: db.raw('now()') }, columns)