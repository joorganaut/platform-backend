import { PartnerUser, PartnerUserEntity } from 'types'
import * as partnerUsersRepository from '../../repositories/partners/partnerUsers.repository'
import { mapPartnerUserFromPartnerUserEntity, mapPartnerUserEntityFromPartnerUser } from '../../dataMappers/partners/partnerUsers.mappers'
import { NotFoundError } from '../../lib'

export const fetchPartnerUsers = async (): Promise<PartnerUser[]> => {
    const partnerUsers: PartnerUserEntity[] = await partnerUsersRepository.fetchPartnerUsers()

    return partnerUsers.map(partnerUser => mapPartnerUserFromPartnerUserEntity(partnerUser))
}

export const fetchPartnerUserById = async (partnerId: string, partnerUserId: string): Promise<PartnerUser> => {
    const partnerUser: PartnerUserEntity = await partnerUsersRepository.fetchPartnerUserById(partnerId, partnerUserId)

    if (!partnerUser) {
        throw new NotFoundError(__filename, `User ID ${partnerUserId} does not exist`)
    }

    return mapPartnerUserFromPartnerUserEntity(partnerUser)
}

export const findPartnerUserByUserId = async (userId: string): Promise<PartnerUser | null> => {
    const partnerUser =  await partnerUsersRepository.fetchPartnerUserByUserId(userId)
    if(!partnerUser) {
        return null
    }
    return mapPartnerUserFromPartnerUserEntity(partnerUser)
}

export const createPartnerUser = async (partnerUser: PartnerUser): Promise<PartnerUser> => {
    const existingPartnerUser = await findPartnerUserByUserId(partnerUser.userId)
    if (existingPartnerUser) {
        return existingPartnerUser
    }
    const partnerUserEntity = mapPartnerUserEntityFromPartnerUser(partnerUser)
    const [db_response] = await partnerUsersRepository.createPartnerUser(partnerUserEntity)

    return mapPartnerUserFromPartnerUserEntity(db_response)
}

export const updatePartnerUser = async (partnerId: string, partnerUserId: string, partnerUser: PartnerUser): Promise<PartnerUser> => {
    const partnerUserEntity = mapPartnerUserEntityFromPartnerUser(partnerUser)
    const [db_response] = await partnerUsersRepository.updatePartnerUser(partnerId, partnerUserId, partnerUserEntity)
    return mapPartnerUserFromPartnerUserEntity(db_response)
}

export const deletePartnerUser = async (partnerId: string, partnerUserId: string): Promise<PartnerUser> => {
    const [db_response] = await partnerUsersRepository.deletePartnerUser(partnerId, partnerUserId)
    return mapPartnerUserFromPartnerUserEntity(db_response)
}