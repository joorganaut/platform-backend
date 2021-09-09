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
        workPhone: entity.work_phone,
        title: entity.title,
        shortName: entity.short_name,
        type: entity.type,
        taxType: entity.tax_type,
        currency: entity.currency,
        name: entity.name,
        firstName: entity.first_name,
        lastName: entity.last_name,
        institutionCode: entity.institution_code
    }
}

export const mapContactEntityFromContact = (contact: Contact, institutionCode: string): ContactEntity => {

    return {
        business_name: contact.businessName,
        email: contact.email,
        phone: contact.phone,
        address: contact.address,
        work_phone: contact.workPhone,
        title: contact.title,
        short_name: contact.shortName,
        type: contact.type,
        tax_type: contact.taxType,
        currency: contact.currency,
        name: contact.name,
        first_name: contact.firstName,
        last_name: contact.lastName,
        institution_code: institutionCode
    }
}