import { Partner, PartnerContent, PartnerContentEntity } from 'types'
import * as partnerContentsRepository from '../../repositories/partners/partnerContents.repository'
import {  mapPartnerContentFromPartnerContentEntity, mapPartnerContentEntityFromPartnerContent } from '../../dataMappers/partners/partnerContents.mappers'
import { NotFoundError } from '../../lib'


export const fetchPartnerContents = async (): Promise<PartnerContent[]> => {
    const partnerContents: PartnerContentEntity[] = await partnerContentsRepository.fetchPartnerContents()

    return partnerContents.map(partnerContent => mapPartnerContentFromPartnerContentEntity(partnerContent))
}

export const fetchPartnerContentById = async (partnerId: string, partnerContentId: string): Promise<PartnerContent> => {
    const partnerContent: PartnerContentEntity = await partnerContentsRepository.fetchPartnerContentById(partnerId, partnerContentId)

    if (!partnerContent) {
        throw new NotFoundError(__filename, `Partner Contnent ID ${[partnerContentId]} does not exist`)
    }

    return mapPartnerContentFromPartnerContentEntity(partnerContent)
} 

export const findPartnerContentByContentId = async (partnerId: string, contentId: string): Promise<PartnerContent> => {
    const partnerContent: PartnerContentEntity = await partnerContentsRepository.fetchPartnerContentByContentId(partnerId, contentId)

    if (!partnerContent) {
        throw new NotFoundError(__filename, `Partner Contnent ID ${[contentId]} does not exist`)
    }

    return mapPartnerContentFromPartnerContentEntity(partnerContent)
} 

export const createPartnerContent = async (partnerContent: PartnerContent): Promise<PartnerContent> => {
    
    const PartnerContentEntity = mapPartnerContentEntityFromPartnerContent(partnerContent)
    const [db_response] = await partnerContentsRepository.createPartnerContent(PartnerContentEntity)

    return mapPartnerContentFromPartnerContentEntity(db_response)
}

export const updatePartnerContent = async (partnerId: string, partnerContentId: string, partnerContent: PartnerContent): Promise<PartnerContent> => {
    const partnerContentEntity = mapPartnerContentEntityFromPartnerContent(partnerContent)
    const [db_response] = await partnerContentsRepository.updatePartnerContent(partnerId, partnerContentId, partnerContentEntity)
    return mapPartnerContentFromPartnerContentEntity(db_response)
}

export const deletePartnerContent = async (partnerId: string, partnerContentId: string): Promise<PartnerContent> => {
    const [db_response] = await partnerContentsRepository.deletePartnerContent(partnerId, partnerContentId)
    return mapPartnerContentFromPartnerContentEntity(db_response)
}