import { Contact, ContactEntity } from '../../types'
import * as repository from '../../repositories/contacts/contacts.repository'
import { mapContactFromContactEntity, mapContactEntityFromContact } from '../../dataMappers/contacts/contacts.mappers'
import { getContacts } from '../admin/google.service'

export const fetchGoogleContacts = async (accessToken: string): Promise<Contact[]> => {
    return await getContacts(accessToken)
}

export const fetchAllContacts = async (institutionCode: string): Promise<Contact[]> => {
    const contactEntities: ContactEntity[] = await repository.fetchContacts(institutionCode)
    const result = contactEntities.map(entity => mapContactFromContactEntity(entity))
    return result
}

export const saveBulkContacts = async (contacts: Contact[], institutionCode: string) => {
    const contactEntities: ContactEntity[] = contacts?.map(contact => mapContactEntityFromContact(contact, institutionCode))
    const { rowCount } = await repository.saveBulkContacts(contactEntities)
    return rowCount
}

export const saveContact = async (contact: Contact, institutionCode: string) => {
    const contactEntity: ContactEntity = mapContactEntityFromContact(contact, institutionCode)
    const response = await repository.createContact(contactEntity)
    return response
}

export const updateContact = async (contactId: string, contact: Contact, institutionCode: string) => {
    const contactEntity: ContactEntity = mapContactEntityFromContact(contact, institutionCode)
    const [db_response] = await repository.updateContact(contactId, contactEntity, institutionCode)
    const response = mapContactFromContactEntity(db_response)
    return response
}

export const deleteContact = async (contactId: string, institutionCode: string) => {
    const [db_response] = await repository.deleteContact(contactId, institutionCode)
    const response = mapContactFromContactEntity(db_response)
    return response
}