import { db } from '../../server/db'

import { PreferenceEntity } from '../../types'

const TABLE_NAME = 'preferences'

const columns = [
    'id',
    'profile_id',
    'instant_notifications_email',
    'daily_summary_email',
    'events_email',
    'deleted_at',
    'created_at',
    'updated_at'
]

export const fetchPreferences = async (): Promise<PreferenceEntity[]> => await db<PreferenceEntity>(TABLE_NAME).whereNull('deleted_at').select(columns)

export const fetchPreferenceById = async (profileId: string, preferenceId: string): Promise<PreferenceEntity> => await db<PreferenceEntity>(TABLE_NAME).whereNull('deleted_at').where({'id': preferenceId, 'profile_id': profileId}).first(columns)

export const fetchPreferenceByProfileId = async (profileId: string): Promise<PreferenceEntity> => await db<PreferenceEntity>(TABLE_NAME).whereNull('deleted_at').where('profile_id', profileId).first(columns)

export const createPreference = async (preference: PreferenceEntity): Promise<PreferenceEntity[]> => await db<PreferenceEntity>(TABLE_NAME).insert({ ...preference, updated_at: db.raw('now()'), created_at: db.raw('now()') }, columns)

export const updatePreference = async (profileId: string, preferenceId: string, preference: PreferenceEntity): Promise<PreferenceEntity[]> => await db<PreferenceEntity>(TABLE_NAME)
    .where({'id': preferenceId, 'profile_id': profileId})
    .whereNull('deleted_at')
    .update({ ...preference, updated_at: db.raw('now()') }, columns)

export const deletePreference = async (profileId: string, preferenceId: string): Promise<PreferenceEntity[]> => await db<PreferenceEntity>(TABLE_NAME)
    .where({'id': preferenceId, 'profile_id': profileId})
    .update({ updated_at: db.raw('now()'), deleted_at: db.raw('now()') }, columns)