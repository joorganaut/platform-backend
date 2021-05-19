import { db } from '../../server/db'

import { UserContentEntity } from '../../types'

const TABLE_NAME = 'user_contents'

const columns = [
    'id',
    'content_id',
    'profile_id',
    'deleted_at',
    'created_at',
    'updated_at'
]

export const fetchUserContents = async (): Promise<UserContentEntity[]> => await db<UserContentEntity>(TABLE_NAME).whereNull('deleted_at').select(columns)

export const fetchUserContentById = async (profileId: string, userContentId: string): Promise<UserContentEntity> => await db<UserContentEntity>(TABLE_NAME).whereNull('deleted_at').where({'id': userContentId, 'profile_id': profileId}).first(columns)

export const fetchUserContentByContentId = async (profileId: string, contentId: string): Promise<UserContentEntity> => await db<UserContentEntity>(TABLE_NAME).whereNull('deleted_at').where({'content_id': contentId, 'profile_id': profileId}).first(columns)

export const createUserContent = async (userContent: UserContentEntity): Promise<UserContentEntity[]> => await db<UserContentEntity>(TABLE_NAME).insert({ ...userContent, updated_at: db.raw('now()'), created_at: db.raw('now()') }, columns)

export const updateUserContent = async (profileId: string, userContentId: string, userContent: UserContentEntity): Promise<UserContentEntity[]> => await db<UserContentEntity>(TABLE_NAME)
    .where({'id': userContentId, 'profile_id': profileId})
    .whereNull('deleted_at')
    .update({ ...userContent, updated_at: db.raw('now()') }, columns)

export const deleteUserContent = async (profileId: string, userContentId: string): Promise<UserContentEntity[]> => await db<UserContentEntity>(TABLE_NAME)
    .where({'id': userContentId, 'profile_id': profileId})
    .update({ updated_at: db.raw('now()'), deleted_at: db.raw('now()') }, columns)