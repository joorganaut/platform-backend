import { Institution, InstitutionEntity } from '../../types/'

/*
 name: string
    logo: string
    color: string
    background_color: string
    website: string
    email: string

    name: string
    logo: string
    color: string
    backgroundColor: string
    website: string
    email: string
*/
export const mapInstitutionFromInstitutionEntity = (entity: InstitutionEntity): Institution => {

    return {
        id: entity.id,
        name: entity.name,
        logo: entity.logo,
        color: entity.color,
        backgroundColor: entity.background_color,
        website: entity.website,
        email: entity.email,
        phone: entity.phone,
        industry: entity.industry,
        passPhrase: entity.pass_phrase,
        address: entity.address
    }
}

export const mapInstitutionEntityFromInstitution = (Institution: Institution): InstitutionEntity => {

    return {
        name: Institution.name,
        logo: Institution.logo,
        color: Institution.color,
        background_color: Institution.backgroundColor,
        website: Institution.website,
        email: Institution.email,
        phone: Institution.phone,
        industry: Institution.industry,
        pass_phrase: Institution.passPhrase,
        address: Institution.address
    }
}