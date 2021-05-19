import { db } from '../../server/db'

import { PartnerEventEntity } from '../../types'

const TABLE_NAME = 'partner_events'

const columns = [
    'id',
    'partner_id',
    'event_id',
    'deleted_at',
    'created_at',
    'updated_at'
]

export const fetchPartnerEvents = async (): Promise<PartnerEventEntity[]> => await db<PartnerEventEntity>(TABLE_NAME).whereNull('deleted_at').select(columns)

export const fetchPartnerEventById = async (partnerId: string, partnerEventId: string): Promise<PartnerEventEntity> => await db<PartnerEventEntity>(TABLE_NAME).whereNull('deleted_at').where({'id': partnerEventId, 'partner_id': partnerId}).first(columns)

export const fetchPartnerEventByEventID = async (eventId: string): Promise<PartnerEventEntity> => await db<PartnerEventEntity>(TABLE_NAME).whereNull('deleted_at').where('event_id', eventId).first(columns)

export const fetchPartnerEventByPartnerID = async (partnerId: string): Promise<PartnerEventEntity> => await db<PartnerEventEntity>(TABLE_NAME).whereNull('deleted_at').where('partner_id', partnerId).first(columns)

export const createPartnerEvent = async (partnerEvent: PartnerEventEntity): Promise<PartnerEventEntity[]> => await db<PartnerEventEntity>(TABLE_NAME).insert({ ...partnerEvent, updated_at: db.raw('now()'), created_at: db.raw('now()') }, columns)

export const updatePartnerEvent = async (partnerId: string, partnerEventId: string, partnerEvent: PartnerEventEntity): Promise<PartnerEventEntity[]> => await db<PartnerEventEntity>(TABLE_NAME)
    .where({'id': partnerEventId, 'partner_id': partnerId})
    .whereNull('deleted_at')
    .update({ ...partnerEvent, updated_at: db.raw('now()') }, columns)

export const deletePartnerEvent = async (partnerId: string, partnerEventId: string): Promise<PartnerEventEntity[]> => await db<PartnerEventEntity>(TABLE_NAME)
    .where({'id': partnerEventId, 'partner_id': partnerId})
    .update({ updated_at: db.raw('now()'), deleted_at: db.raw('now()') }, columns)