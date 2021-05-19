import { PartnerUser, PartnerUserEntity} from 'types'

export const mapPartnerUserFromPartnerUserEntity = (entity: PartnerUserEntity): PartnerUser => {

    return {
        id: entity.id,
        partnerId: entity.partner_id,
        userId: entity.user_id,
    }
}

export const mapPartnerUserEntityFromPartnerUser = (partnerUser: PartnerUser): PartnerUserEntity => {

    return {
        partner_id: partnerUser.partnerId,
        user_id: partnerUser.userId,
    }
}