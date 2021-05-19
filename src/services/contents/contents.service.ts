import { Content, ContentEntity, UserContent, PartnerContent, PagingParams } from "types"
import * as contentsRepository from '../../repositories/contents/contents.repository'
import { mapContentFromContentEntity, mapContentEntityFromContent } from '../../dataMappers/contents/contents.mappers'
import { NotFoundError, BadRequestError } from '../../lib'

import { createUserContent, findUserContentByContentId, updateUserContent, deleteUserContent } from '../users/userContents.service'
import { createPartnerContent, findPartnerContentByContentId, updatePartnerContent, deletePartnerContent } from '../partners/partnerContents.service'
import { findUserById } from '../users/users.service'
import { findProfileByUserId } from '../users/profiles.service'
import { findPartnerUserByUserId } from '../partners/partnerUsers.service'

export const fetchContents = async (params?: PagingParams): Promise<Content[] | any> => {
    const result = await contentsRepository.fetchContents(params)
    if (!params) {
        return (result as ContentEntity[])?.map(content => mapContentFromContentEntity(content))
    }
    return { ...result, data: result?.data?.map((content: ContentEntity) => mapContentFromContentEntity(content)) }
}

export const findContentByID = async (contentId: string): Promise<Content> => {
    const content: ContentEntity = await contentsRepository.fetchContentById(contentId)

    if (!content) {
        throw new NotFoundError(__filename, `Content ID ${contentId} does not exist`)
    }

    return mapContentFromContentEntity(content)
}

export const createContent = async (content: Content, userId: string): Promise<Content> => {
    const currentUser = await findUserById(userId as string)

    if (currentUser.role === "Member") {
        const contentEntityForUser = mapContentEntityFromContent(content)
        const currentProfile =  await findProfileByUserId(currentUser.id as string)
        const newUserContent: UserContent = {
            profileId: currentProfile?.id as string,
            contentId: '',
        }
        const [db_response] = await contentsRepository.createContent(contentEntityForUser)
        newUserContent.contentId = db_response.id as string
        const new_UserContent = await createUserContent(newUserContent)

        return mapContentFromContentEntity(db_response)
    } 
        const contentEntityForPartner = mapContentEntityFromContent(content)
        const currentPartnerUser =  await findPartnerUserByUserId(currentUser.id as string)
        if (!currentPartnerUser) {
            throw new BadRequestError(__filename, 'Must be signed in with a valid account to post content')
        }
        const newPartnerContent: PartnerContent = {
            partnerId: currentPartnerUser.partnerId,
            contentId: '',
        }
        const [db_response] = await contentsRepository.createContent(contentEntityForPartner)
        newPartnerContent.contentId = db_response.id as string
        await createPartnerContent(newPartnerContent)

        return mapContentFromContentEntity(db_response)
    
}

export const reportContent = async (contentId: string, report: string): Promise<Content> => {
    const currentContent = await findContentByID(contentId)
    if (!currentContent.flagged) {
        currentContent.reports = [report]
        currentContent.flagged = true
        const [content] = await contentsRepository.updateContent(contentId, mapContentEntityFromContent(currentContent))
        return mapContentFromContentEntity(content)
    }
    currentContent.reports = [...currentContent.reports, report]
    const [content] = await contentsRepository.updateContent(contentId, mapContentEntityFromContent(currentContent))
    return mapContentFromContentEntity(content)

}

export const updateContent = async (contentId: string, userId: string, content: Content): Promise<Content> => {
    const currentUser = await findUserById(userId)
    const contentEntity = mapContentEntityFromContent(content)

    if (currentUser.role === "Member") {
        const currentProfile = await findProfileByUserId(currentUser.id as string)
        if (!currentProfile) {
            throw new BadRequestError(__filename, 'Must be signed in with a valid account to update content')
        }
        const oldUserContent = await findUserContentByContentId(currentProfile.id as string, contentId)
        const [db_response] = await contentsRepository.updateContent(contentId, contentEntity)
        await updateUserContent(currentProfile.id as string, oldUserContent.id as string, oldUserContent)

        return mapContentFromContentEntity(db_response)
    }
    const currentPartnerUser =  await findPartnerUserByUserId(currentUser.id as string)
    if (!currentPartnerUser) {
        throw new BadRequestError(__filename, 'Must be signed in with a valid account to update content')
    }
    const oldPartnerContent = await findPartnerContentByContentId(currentPartnerUser.partnerId, contentId)
    const [db_response] = await contentsRepository.updateContent(contentId, contentEntity)
    await updatePartnerContent(oldPartnerContent.partnerId, oldPartnerContent.id as string, oldPartnerContent)
    
    return mapContentFromContentEntity(db_response)
}

export const deleteContent = async (contentId: string, userId: string): Promise<Content> => {
    const currentUser = await findUserById(userId)

    if (currentUser.role === "Member") {
        const currentProfile = await findProfileByUserId(currentUser.id as string)
        if (!currentProfile) {
            throw new BadRequestError(__filename, 'Must be signed in with a valid account to update content')
        }
        const oldUserContent = await findUserContentByContentId(currentProfile.id as string, contentId)
        const [db_response] = await contentsRepository.deleteContent(contentId)
        await deleteUserContent(currentProfile.id as string, oldUserContent.id as string)

        return mapContentFromContentEntity(db_response)
    }
    const currentPartnerUser =  await findPartnerUserByUserId(currentUser.id as string)
    if (!currentPartnerUser) {
        throw new BadRequestError(__filename, 'Must be signed in with a valid account to update content')
    }
    const oldPartnerContent = await findPartnerContentByContentId(currentPartnerUser.partnerId, contentId)
    const [db_response] = await contentsRepository.deleteContent(contentId)
    await deletePartnerContent(oldPartnerContent.partnerId, oldPartnerContent.id as string)

    return mapContentFromContentEntity(db_response)
}