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