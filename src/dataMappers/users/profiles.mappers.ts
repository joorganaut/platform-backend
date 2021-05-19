import { Profile, ProfileEntity } from '../../types'

export const mapProfileFromProfileEntity = (entity: ProfileEntity): Profile => {

    return {
        id: entity.id,
        userId: entity.user_id,
        location: entity.location,
        bio: entity.bio,
        avatar: entity.avatar,
        title: entity.title,
        industry: entity.industry,
        handler: entity.handler,
    }

}

export const mapProfileEntityFromProfile = (profile: Profile): ProfileEntity => {

    return {
        user_id: profile.userId,
        location: profile.location,
        bio: profile.bio,
        avatar: profile.avatar,
        title: profile.title,
        industry: profile.industry,
        handler: profile.handler,
    }

}