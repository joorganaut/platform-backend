import { UserContent, UserContentEntity } from '../../types'

export const mapUserContentFromUserContentEntity = (entity: UserContentEntity): UserContent => {

    return {
        id: entity.id,
        contentId: entity.content_id,
        profileId: entity.profile_id
    }
}

export const mapUserContentEntityFromUserContent = (userContent: UserContent): UserContentEntity => {

    return {
        content_id: userContent.contentId,
        profile_id: userContent.profileId
    }
}