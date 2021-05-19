import { db } from '../../server/db'

import { PartnerContentEntity } from '../../types'

const TABLE_NAME = 'partner_contents'

const columns = [
    'id',
    'content_id',
    'partner_id',
    'deleted_at',
    'created_at',
    'updated_at'
]

export const fetchPartnerContents = async (): Promise<PartnerContentEntity[]> => await db<PartnerContentEntity>(TABLE_NAME).whereNull('deleted_at').select(columns)

export const fetchPartnerContentById = async (partnerId: string, partnerContentId: string): Promise<PartnerContentEntity> => await db<PartnerContentEntity>(TABLE_NAME).whereNull('deleted_at').where({'id': partnerContentId, 'partner_id': partnerId}).first(columns)

export const fetchPartnerContentByContentId = async (partnerId: string, contentId: string): Promise<PartnerContentEntity> => await db<PartnerContentEntity>(TABLE_NAME).whereNull('deleted_at').where({'content_id': contentId, 'partner_id': partnerId}).first(columns)

export const createPartnerContent = async (partnerContent: PartnerContentEntity): Promise<PartnerContentEntity[]> => await db<PartnerContentEntity>(TABLE_NAME).insert({ ...partnerContent, updated_at: db.raw('now()'), created_at: db.raw('now()') }, columns)

export const updatePartnerContent = async (partnerId: string, partnerContentId: string, partnerContent: PartnerContentEntity): Promise<PartnerContentEntity[]> => await db<PartnerContentEntity>(TABLE_NAME)
    .where({'id': partnerContentId, 'partner_id': partnerId})
    .whereNull('deleted_at')
    .update({ ...partnerContent, updated_at: db.raw('now()') }, columns)

export const deletePartnerContent = async (partnerId: string, partnerContentId: string): Promise<PartnerContentEntity[]> => await db<PartnerContentEntity>(TABLE_NAME)
    .where({'id': partnerContentId, 'partner_id': partnerId})
    .update({ updated_at: db.raw('now()'), deleted_at: db.raw('now()') }, columns)