import { Preference, PreferenceEntity } from 'types'
import * as preferencesRepository from '../../repositories/users/preferences.repository'
import { mapPreferenceFromPreferenceEntity, mapPreferenceEntityFromPreference } from '../../dataMappers/users/preferences.mappers'
import { NotFoundError } from "../../lib"

export const fetchPreferences = async (): Promise<Preference[]> => {
    const preferences: PreferenceEntity[] = await preferencesRepository.fetchPreferences()

    return preferences.map(preference => mapPreferenceFromPreferenceEntity(preference))
}

export const fetchPreferenceById = async (profileId: string, preferenceId: string): Promise<Preference> => {
    const preference: PreferenceEntity = await preferencesRepository.fetchPreferenceById(profileId, preferenceId)

    if (!preference) {
        throw new NotFoundError(__filename, `Preference Id ${preferenceId} does not exist`)
    }

    return mapPreferenceFromPreferenceEntity(preference)
}

export const findPreferenceByProfileId =  async (profileId:string): Promise<Preference | null> => {
    const preference = await  preferencesRepository.fetchPreferenceByProfileId(profileId)

    if (!preference) {
        return null
    }

    return mapPreferenceFromPreferenceEntity(preference)
}

export const createPreference = async (preference: Preference): Promise<Preference> => {
    const existingPreference = await findPreferenceByProfileId(preference.profileId)
    if( existingPreference) {
        return existingPreference
    }
    const preferenceEntity = mapPreferenceEntityFromPreference(preference)
    const [db_response] = await preferencesRepository.createPreference(preferenceEntity)

    return mapPreferenceFromPreferenceEntity(db_response)
}

export const updatePreference = async (profileId: string, preferenceId: string, preference: Preference): Promise<Preference> => {
    const preferenceEntity = mapPreferenceEntityFromPreference(preference)
    const [db_response] = await preferencesRepository.updatePreference(profileId, preferenceId, preferenceEntity)
    return mapPreferenceFromPreferenceEntity(db_response)
}

export const deletePreference = async (profileId: string, preferenceId: string): Promise<Preference> => {
    const [db_response] = await preferencesRepository.deletePreference(profileId, preferenceId)
    return mapPreferenceFromPreferenceEntity(db_response)
}