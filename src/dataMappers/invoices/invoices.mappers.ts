import { Invoice, InvoiceEntity, InvoiceContent } from '../../types/'

/*
export interface Invoice extends BusinessObject {
    project?: string
    Invoice: string
    status: InvoiceStatus
    description: string
    totalAmount: string
    hasTax: boolean
    taxContent: InvoiceContent[]
    content: InvoiceContent[]
    client: string
    expiryDate?: Date
    isRecurring: boolean
    interval?: any
}

export interface InvoiceEntity extends Entity {
    project?: string
    Invoice: string
    status: InvoiceStatus
    description: string
    total_amount: string
    has_tax: boolean
    tax_content: InvoiceContent[] | string
    content: InvoiceContent[] | string
    client: string
    expiryDate?: Date
    is_recurring: boolean
    interval?: any
}
*/

export const mapInvoiceFromInvoiceEntity = (entity: InvoiceEntity): Invoice => {

    return {
        id: entity.id,
        projectId: entity.project,
        contactId: entity.contact,
        status: entity.status,
        description: entity.description,
        totalAmount: entity.total_amount,
        hasTax: entity.has_tax,
        taxContent: entity.tax_content as InvoiceContent[],
        content: entity.content as InvoiceContent[],
        clientId: entity.client,
        expiryDate: entity.expiry_date,
        isRecurring: entity.is_recurring,
        interval: entity.interval,
        accountId: entity.account,
        institutionCode: entity.institution_code
    }
}

export const mapInvoiceEntityFromInvoice = (invoice: Invoice, institutionCode: string): InvoiceEntity => {

    return {
        project: invoice.projectId,
        client: invoice.clientId,
        contact: invoice.clientId,
        status: invoice.status,
        description: invoice.description,
        total_amount: invoice.totalAmount,
        has_tax: invoice.hasTax,
        tax_content: JSON.stringify(invoice.taxContent),
        content: JSON.stringify(invoice.content),
        expiry_date: invoice.expiryDate,
        is_recurring: invoice.isRecurring,
        interval: invoice.interval || 0,
        account: invoice.accountId,
        institution_code: institutionCode
    }
}