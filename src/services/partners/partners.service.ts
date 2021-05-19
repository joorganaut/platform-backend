import { Partner, PartnerEntity } from '../../types'
import * as partnersRepository from '../../repositories/partners/partners.repository'
import { mapPartnerFromPartnerEntity, mapPartnerEntityFromPartner } from '../../dataMappers/partners/partners.mappers'
import { NotFoundError } from "../../lib"

export const fetchPartners = async (): Promise<Partner[]> => {
    const partners: PartnerEntity[] = await partnersRepository.fetchPartners()

    return partners.map(partner => mapPartnerFromPartnerEntity(partner))
}

export const findPartnerById = async (partnerId: string): Promise<Partner> => {
    const partner: PartnerEntity = await partnersRepository.fetchPartnerById(partnerId)

    if(!partner) {
        throw new NotFoundError(__filename, `Partner ID ${partnerId} does not exist`)
    }

    return mapPartnerFromPartnerEntity(partner)
}

export const findPartnerByEmail = async (email: string): Promise<Partner | null> => {
    const partner = await partnersRepository.fetchPartnerByEmail(email)
    if (!partner) {
        return null
    }
    return mapPartnerFromPartnerEntity(partner)
}

export const createPartner = async (partner: Partner): Promise<Partner> => {

    const partnerEntity = mapPartnerEntityFromPartner(partner)
    const [db_response] = await partnersRepository.createPartner(partnerEntity)

    return mapPartnerFromPartnerEntity(db_response)
}

export const updatePartner = async (partnerId: string, partner: Partner): Promise<Partner> => {
    const partnerEntity = mapPartnerEntityFromPartner(partner)
    const [db_response] = await partnersRepository.updatePartner(partnerId, partnerEntity)
    return mapPartnerFromPartnerEntity(db_response)
}

export const deletePartner =  async (partnerId: string): Promise<Partner> => {
    const [db_response] = await partnersRepository.deletePartner(partnerId)
    return mapPartnerFromPartnerEntity(db_response)
}