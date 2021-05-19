import { db } from '../../server/db'

import { PartnerUserEntity } from '../../types'

const TABLE_NAME = 'partner_users'

const columns = [
    'id',
    'partner_id',
    'user_id',
    'deleted_at',
    'created_at',
    'updated_at'
]

export const fetchPartnerUsers = async (): Promise<PartnerUserEntity[]> => await db<PartnerUserEntity>(TABLE_NAME).whereNull('deleted_at').select(columns)

export const fetchPartnerUserById = async (partnerId: string, partnerUserId: string): Promise<PartnerUserEntity> => await db<PartnerUserEntity>(TABLE_NAME).whereNull('deleted_at').where({'id': partnerUserId, 'partner_id': partnerId}).first(columns)

export const fetchPartnerUserByUserId = async (userId: string): Promise<PartnerUserEntity> => await db<PartnerUserEntity>(TABLE_NAME).whereNull('deleted_at').where('user_id', userId).first(columns)

export const createPartnerUser = async (partnerUser: PartnerUserEntity): Promise<PartnerUserEntity[]> => await db<PartnerUserEntity>(TABLE_NAME).insert({ ...partnerUser, updated_at: db.raw('now()'), created_at: db.raw('now()') }, columns)

export const updatePartnerUser = async (partnerId: string, partnerUserId: string, partnerUser: PartnerUserEntity): Promise<PartnerUserEntity[]> => await db<PartnerUserEntity>(TABLE_NAME)
    .where({'id': partnerUserId, 'partner_id': partnerId})
    .whereNull('deleted_at')
    .update({ ...partnerUser, updated_at: db.raw('now()') }, columns)

export const deletePartnerUser = async (partnerId: string, partnerUserId: string): Promise<PartnerUserEntity[]> => await db<PartnerUserEntity>(TABLE_NAME)
    .where({'id': partnerUserId, 'partner_id': partnerId})
    .update({ updated_at: db.raw('now()'), deleted_at: db.raw('now()') }, columns)