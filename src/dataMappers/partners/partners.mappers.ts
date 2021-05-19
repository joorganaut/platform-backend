import { Partner, PartnerEntity } from '../../types/'

export const mapPartnerFromPartnerEntity = (entity: PartnerEntity): Partner => {

    return {
        id: entity.id,
        name: entity.name,
        description: entity.description,
        enabled: entity.enabled,
        founded: entity.founded,
        companySize: entity.company_size
    }
}

export const mapPartnerEntityFromPartner = (partner: Partner): PartnerEntity => {

    return {
        name: partner.name,
        description: partner.description,
        enabled: partner.enabled,
        founded: partner.founded,
        company_size: partner.companySize
    }
}