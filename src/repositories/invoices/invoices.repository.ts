import { db } from '../../server/db'
import { InvoiceEntity, PagingParams } from '../../types'

const TABLE_NAME = 'invoices'

const columns = [
    'id',
    'project',
    'contact',
    'status',
    'description',
    'total_amount',
    'has_tax',
    'tax_content',
    'content',
    'client',
    'expiry_date',
    'is_recurring',
    'interval'
]

export const fetchInvoices = async (institutionCode: string, params?: PagingParams): Promise<InvoiceEntity[] | any> => {
    if (params) {
        const offSet = ((params.page as number < 1 ? 1 : params.page) - 1) * params.pageSize
        const [count] = await db<InvoiceEntity>(TABLE_NAME).count('id').whereNull('deleted_at').where('institution_code', institutionCode)
        params.totalCount = count['count'] as number
        const result = await db<InvoiceEntity>(TABLE_NAME).whereNull('deleted_at').where('institution_code', institutionCode).offset(offSet).limit(params.pageSize).select(columns).orderBy(params.sort, params.dir)
        params.data = result
        return params
    }
    return await db<InvoiceEntity>(TABLE_NAME).whereNull('deleted_at').where('institution_code', institutionCode).select(columns)
}

export const fetchInvoiceById = async (invoiceId: string, institutionCode: string): Promise<InvoiceEntity> => await db<InvoiceEntity>(TABLE_NAME).whereNull('deleted_at').where('id', invoiceId).where('institution_code', institutionCode).first(columns)

export const fetchInvoiceByProject = async (project: string, institutionCode: string): Promise<InvoiceEntity[]> => await db<InvoiceEntity>(TABLE_NAME).whereNull('deleted_at').where('project', project).where('institution_code', institutionCode)

export const fetchInvoiceByContact = async (contact: string, institutionCode: string): Promise<InvoiceEntity[]> => await db<InvoiceEntity>(TABLE_NAME).whereNull('deleted_at').where('contact', contact).where('institution_code', institutionCode)

export const createInvoice = async (invoice: InvoiceEntity): Promise<InvoiceEntity[]> => await db<InvoiceEntity>(TABLE_NAME).insert({ ...invoice, updated_at: db.raw('now()'), created_at: db.raw('now()') }, columns)

export const updateInvoice = async (invoiceId: string, invoice: InvoiceEntity, institutionCode: string): Promise<InvoiceEntity[]> => await db<InvoiceEntity>(TABLE_NAME)
    .where('id', invoiceId)
    .where('institution_code', institutionCode)
    .whereNull('deleted_at')
    .update({ ...invoice, updated_at: db.raw('now()') }, columns)

export const deleteInvoice = async (InvoiceId: string, institutionCode: string): Promise<InvoiceEntity[]> => await db<InvoiceEntity>(TABLE_NAME)
    .where('id', InvoiceId)
    .where('institution_code', institutionCode)
    .update({ updated_at: db.raw('now()'), deleted_at: db.raw('now()') }, columns)