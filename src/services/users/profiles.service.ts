import { Profile, ProfileEntity } from '../../types'
import * as profilesRepository from '../../repositories/users/profiles.repository'
import { mapProfileFromProfileEntity, mapProfileEntityFromProfile } from '../../dataMappers/users/profiles.mappers'
import { NotFoundError } from '../../lib'

export const fetchProfiles = async (): Promise<Profile[]> => {
    const profiles: ProfileEntity[] = await profilesRepository.fetchProfiles()

    return profiles.map(profile => mapProfileFromProfileEntity(profile))
}

export const fetchProfileById = async (profileId: string): Promise<Profile> => {
    const profile: ProfileEntity = await profilesRepository.fetchProfileById(profileId)

    if (!profile) {
        throw new NotFoundError(__filename, `Profile ID ${profileId} does not exist`)
    }

    return mapProfileFromProfileEntity(profile)
}

export const findProfileByUserId = async (userId: string): Promise<Profile | null> => {
    const profile = await profilesRepository.fetchProfileByUserId(userId)
    if (!profile) {
        return null
    }
    return mapProfileFromProfileEntity(profile)
}

export const createProfile = async (profile: Profile): Promise<Profile> => {
    const existingProfile = await findProfileByUserId(profile.userId)
    if (existingProfile) {
        return existingProfile
    }
    const profileEntity = mapProfileEntityFromProfile(profile)
    const [db_response] = await profilesRepository.createProfile(profileEntity)

    return mapProfileFromProfileEntity(db_response)
}

export const updateProfile = async (userId: string, profile: Profile): Promise<Profile> => {
    const existingProfile: Profile = await findProfileByUserId(userId) as Profile
    if (!existingProfile) {
        throw new NotFoundError(__filename, `No Profile found for User ID ${userId}`)
    }
    const profileEntity = mapProfileEntityFromProfile(profile)
    const [db_response] = await profilesRepository.updateProfile(userId, existingProfile.id as string, profileEntity)
    return mapProfileFromProfileEntity(db_response)
}

export const deleteProfile = async (userId: string): Promise<Profile> => {
    const existingProfile: Profile = await findProfileByUserId(userId) as Profile
    if (!existingProfile) {
        throw new NotFoundError(__filename, `No Profile found for User ID ${userId}`)
    }
    const [db_response] = await profilesRepository.deleteProfile(userId, existingProfile?.id as string)
    return mapProfileFromProfileEntity(db_response)
}