import { db } from '../../server/db'

import { PartnerEntity } from '../../types'

const TABLE_NAME = 'partners'

const columns = [
    'id',
    'name',
    'description',
    'enabled',
    'deleted_at',
    'created_at',
    'updated_at',
    'founded',
    'company_size'
]

export const fetchPartners = async (): Promise<PartnerEntity[]> => await db<PartnerEntity>(TABLE_NAME).whereNull('deleted_at').select(columns)

export const fetchPartnerById = async (partnerId: string): Promise<PartnerEntity> => await db<PartnerEntity>(TABLE_NAME).whereNull('deleted_at').where('id', partnerId).first(columns)

export const fetchPartnerByEmail = async (email: string): Promise<PartnerEntity> => await db<PartnerEntity>(TABLE_NAME).whereNull('deleted_at').where('name', email).first(columns)

export const createPartner = async (partner: PartnerEntity): Promise<PartnerEntity[]> => await db<PartnerEntity>(TABLE_NAME).insert({ ...partner, updated_at: db.raw('now()'), created_at: db.raw('now()') }, columns)

export const updatePartner = async (partnerId: string, partner: PartnerEntity): Promise<PartnerEntity[]> => await db<PartnerEntity>(TABLE_NAME)
    .where('id', partnerId)
    .whereNull('deleted_at')
    .update({ ...partner, updated_at: db.raw('now()') }, columns)

export const deletePartner = async (partnerId: string): Promise<PartnerEntity[]> => await db<PartnerEntity>(TABLE_NAME)
    .where('id', partnerId)
    .update({ updated_at: db.raw('now()'), deleted_at: db.raw('now()') }, columns)