import { PartnerContent, PartnerContentEntity } from '../../types'

export const mapPartnerContentFromPartnerContentEntity = (entity: PartnerContentEntity): PartnerContent => {

    return {
        id: entity.id,
        contentId: entity.content_id,
        partnerId: entity.partner_id,
    }
}

export const mapPartnerContentEntityFromPartnerContent = (partnerContent: PartnerContent): PartnerContentEntity => {

    return {
        content_id: partnerContent.contentId,
        partner_id: partnerContent.partnerId,
    }
}