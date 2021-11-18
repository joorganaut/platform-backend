import { db } from '../../server/db'
import { ContactEntity, PagingParams } from '../../types'

const TABLE_NAME = 'contacts'

const columns = [
    'id',
    'name',
    'business_name',
    'email',
    'phone',
    'address',
    'currency',
    'tax_type',
    'short_name',
    'title',
    'work_phone',
    'type',
    'first_name',
    'last_name',
    'website'
]

export const fetchContacts = async (institutionCode: string, params?: PagingParams): Promise<ContactEntity[] | any> => {
    if (params) {
        const offSet = ((params.page as number < 1 ? 1 : params.page) - 1) * params.pageSize
        const [count] = await db<ContactEntity>(TABLE_NAME).count('id').whereNull('deleted_at').where('institution_code', institutionCode)
        params.totalCount = count['count'] as number
        const result = await db<ContactEntity>(TABLE_NAME).whereNull('deleted_at').where('institution_code', institutionCode).offset(offSet).limit(params.pageSize).select(columns).orderBy(params.sort, params.dir)
        params.data = result
        return params
    }
    const result = await db<ContactEntity>(TABLE_NAME).whereNull('deleted_at').where('institution_code', institutionCode).select(columns)
    return result
}

export const fetchContactById = async (ContactId: string, institutionCode: string): Promise<ContactEntity> => await db<ContactEntity>(TABLE_NAME).whereNull('deleted_at').where('id', ContactId).where('institution_code', institutionCode).first(columns)

export const fetchContactByName = async (name: string, institutionCode: string): Promise<ContactEntity> => await db<ContactEntity>(TABLE_NAME).whereNull('deleted_at').where('name', name).where('institution_code', institutionCode).first(columns)

export const fetchContactByBusinessName = async (number: string, institutionCode: string): Promise<ContactEntity> => await db<ContactEntity>(TABLE_NAME).whereNull('deleted_at').where('business_name', number).where('institution_code', institutionCode).first(columns)

export const createContact = async (Contact: ContactEntity): Promise<ContactEntity[]> => await db<ContactEntity>(TABLE_NAME).insert({ ...Contact, updated_at: db.raw('now()'), created_at: db.raw('now()') }, columns)

export const updateContact = async (ContactId: string, Contact: ContactEntity, institutionCode: string): Promise<ContactEntity[]> => await db<ContactEntity>(TABLE_NAME)
    .where('id', ContactId)
    .where('institution_code', institutionCode)
    .whereNull('deleted_at')
    .update({ ...Contact, updated_at: db.raw('now()') }, columns)

export const deleteContact = async (ContactId: string, institutionCode: string): Promise<ContactEntity[]> => await db<ContactEntity>(TABLE_NAME)
    .where('id', ContactId)
    .where('institution_code', institutionCode)
    .update({ updated_at: db.raw('now()'), deleted_at: db.raw('now()') }, columns)


export const saveBulkContacts = async (contacts: ContactEntity[]) => {
    let result: any = null
    result = await db<ContactEntity>(TABLE_NAME).insert(contacts)
    return result
}