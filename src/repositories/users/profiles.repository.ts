import { db } from '../../server/db'

import { ProfileEntity } from '../../types'

const TABLE_NAME = 'profiles'

const columns = [
    'id',
    'user_id',
    'location',
    'bio',
    'avatar',
    'title',
    'industry',
    'handler',
    'deleted_at',
    'created_at',
    'updated_at'
]

export const fetchProfiles = async (): Promise<ProfileEntity[]> => await db<ProfileEntity>(TABLE_NAME).whereNull('deleted_at').select(columns)

export const fetchProfileById = async (userId: string, profileId: string): Promise<ProfileEntity> => await db<ProfileEntity>(TABLE_NAME).whereNull('deleted_at').where({'id': profileId, 'user_id': userId}).first(columns)

export const fetchProfileByUserId = async (userId: string): Promise<ProfileEntity> => await db<ProfileEntity>(TABLE_NAME).whereNull('deleted_at').where('user_id', userId).first(columns)

export const createProfile = async (profile: ProfileEntity): Promise<ProfileEntity[]> => await db<ProfileEntity>(TABLE_NAME).insert({ ...profile, updated_at: db.raw('now()'), created_at: db.raw('now()') }, columns)

export const updateProfile = async (userId: string, profileId: string, profile: ProfileEntity): Promise<ProfileEntity[]> => await db<ProfileEntity>(TABLE_NAME)
    .where({'id': profileId, 'user_id': userId})
    .whereNull('deleted_at')
    .update({ ...profile, updated_at: db.raw('now()') }, columns)

export const deleteProfile = async (userId: string, profileId: string): Promise<ProfileEntity[]> => await db<ProfileEntity>(TABLE_NAME)
    .where({'id': profileId, 'user_id': userId})
    .update({ updated_at: db.raw('now()'), deleted_at: db.raw('now()') }, columns)
