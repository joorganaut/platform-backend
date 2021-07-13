import { UserContent, UserContentEntity } from '../../types'
import * as userContentsRepository from '../../repositories/users/userContents.repository'
import { mapUserContentFromUserContentEntity, mapUserContentEntityFromUserContent } from '../../dataMappers/users/userContents.mappers'
import { NotFoundError } from '../../lib'

export const fetchUserContents = async (): Promise<UserContent[]> => {
    const userContents: UserContentEntity[] = await userContentsRepository.fetchUserContents()

    return userContents.map(userContent => mapUserContentFromUserContentEntity(userContent))
}

export const fetchUserContentById = async (profileId: string, userContentId: string): Promise<UserContent> => {
    const userContent: UserContentEntity = await userContentsRepository.fetchUserContentById(profileId, userContentId)

    if (!userContent) {
        throw new NotFoundError(__filename, `User Content Id ${userContentId} does not exist`)
    }

    return mapUserContentFromUserContentEntity(userContent)
}

export const findUserContentByContentId = async (profileId: string, contentId: string): Promise<UserContent> => {
    const userContent: UserContentEntity = await userContentsRepository.fetchUserContentByContentId(profileId, contentId)

    if (!userContent) {
        throw new NotFoundError(__filename, `Content Id ${contentId} does not exist`)
    }

    return mapUserContentFromUserContentEntity(userContent)
}

export const createUserContent = async (userContent: UserContent): Promise<UserContent> => {
    
    const userContentEntity = mapUserContentEntityFromUserContent(userContent)
    const [db_response] = await userContentsRepository.createUserContent(userContentEntity)

    return mapUserContentFromUserContentEntity(db_response)
}

export const updateUserContent = async (profileId: string, userContentId: string, userContent: UserContent): Promise<UserContent> => {
    const userContentEntity = mapUserContentEntityFromUserContent (userContent)
    const [db_response] =  await userContentsRepository.updateUserContent(profileId, userContentId, userContentEntity)
    return mapUserContentFromUserContentEntity(db_response)
}

export const deleteUserContent = async (profileId: string, userContentId: string): Promise<UserContent> => {
    const [db_response] = await userContentsRepository.deleteUserContent(profileId, userContentId)
    return mapUserContentFromUserContentEntity(db_response)
}