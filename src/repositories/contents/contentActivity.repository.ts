import { db } from '../../server/db'

import { ContentActivityEntity } from 'types'

const TABLE_NAME = 'content_activity'

const columns = [
    'id',
    'content_id',
    'type',
    'type_value',
    'deleted_at',
    'created_at',
    'updated_at'
]

export const fetchContentActivities = async (): Promise<ContentActivityEntity[]> => await db<ContentActivityEntity>(TABLE_NAME).whereNull('deleted_at').select(columns)

export const fetchContentActivityById = async (contentId: string, activityId: string): Promise<ContentActivityEntity> => await db<ContentActivityEntity>(TABLE_NAME).whereNull('deleted_at').where({'id': activityId, 'content_id': contentId}).first(columns)

export const fetchContentActivityByContentId = async (contentId: string): Promise<ContentActivityEntity> => await db<ContentActivityEntity>(TABLE_NAME).whereNull('deleted_at').where('content_id', contentId).first(columns)

export const fetchReactions = async (contentId: string): Promise<ContentActivityEntity[]> => await db<ContentActivityEntity>(TABLE_NAME).whereNull('deleted_at').where({'content_id': contentId, 'type': 'reaction'}).select(columns)

export const createContentActivity = async (contentActivity: ContentActivityEntity): Promise<ContentActivityEntity[]> => await db<ContentActivityEntity>(TABLE_NAME).insert({ ...contentActivity, updated_at: db.raw('now()'), created_at: db.raw('now()') }, columns)

export const updateContentActivity = async (activityId: string, contentActivity: ContentActivityEntity, contentId?: string): Promise<ContentActivityEntity[]> => await db<ContentActivityEntity>(TABLE_NAME)
    .where({'id': activityId})
    .whereNull('deleted_at')
    .update({ ...contentActivity, updated_at: db.raw('now()') }, columns)
 
export const deleteContentActivity = async (activityId: string, contentId?: string): Promise<ContentActivityEntity[]> => await db<ContentActivityEntity>(TABLE_NAME)
    .where({'id': activityId})
    .update({ updated_at: db.raw('now()'), deleted_at: db.raw('now()') }, columns)