import { Contact, ContactEntity } from '../../types/'

/*
export interface Contact extends BusinessObject {
    name: string
    businessName: string
    email: string
    phone: string
    address: string
}

export interface ContactEntity extends Entity {
    name: string
    business_name: string
    email: string
    phone: string
    address: string
}
*/

export const mapContactFromContactEntity = (entity: ContactEntity): Contact => {

    return {
        id: entity.id,
        businessName: entity.business_name,
        email: entity.email,
        phone: entity.phone,
        address: entity.address,

        name: entity.name,
        institutionCode: entity.institution_code
    }
}

export const mapContactEntityFromContact = (contact: Contact): ContactEntity => {

    return {
        business_name: contact.businessName,
        email: contact.email,
        phone: contact.phone,
        address: contact.address,

        name: contact.name,
        institution_code: contact.institutionCode
    }
}