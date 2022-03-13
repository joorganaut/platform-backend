import { Invoice, InvoiceEntity, InvoiceStatus } from '../../types'
import * as repository from '../../repositories/invoices/invoices.repository'
// import * as mailService from '../../services/messaging/mail.service'
import { mapInvoiceFromInvoiceEntity, mapInvoiceEntityFromInvoice } from '../../dataMappers/invoices/invoices.mappers'



export const fetchInvoice = async (InvoiceId: string, institutionCode: string): Promise<Invoice> => {
    const entity: InvoiceEntity = await repository.fetchInvoiceById(InvoiceId, institutionCode)
    const result = mapInvoiceFromInvoiceEntity(entity)
    return result
}

export const fetchAllInvoices = async (institutionCode: string): Promise<Invoice[]> => {
    const InvoiceEntities: InvoiceEntity[] = await repository.fetchInvoices(institutionCode)
    const result = InvoiceEntities.map(entity => mapInvoiceFromInvoiceEntity(entity))
    return result
}

export const saveInvoice = async (Invoice: Invoice, institutionCode: string) => {
    const InvoiceEntity: InvoiceEntity = mapInvoiceEntityFromInvoice(Invoice, institutionCode)
    const [response] = await repository.createInvoice(InvoiceEntity)
    // mailService.sendTestMail()
    return mapInvoiceFromInvoiceEntity(response)
}


export const updateInvoice = async (InvoiceId: string, Invoice: Invoice, institutionCode: string) => {
    const InvoiceEntity: InvoiceEntity = mapInvoiceEntityFromInvoice(Invoice, institutionCode)
    const [db_response] = await repository.updateInvoice(InvoiceId, InvoiceEntity, institutionCode)
    const response = mapInvoiceFromInvoiceEntity(db_response)
    return response
}

export const deleteInvoice = async (InvoiceId: string, institutionCode: string) => {
    const [db_response] = await repository.deleteInvoice(InvoiceId, institutionCode)
    const response = mapInvoiceFromInvoiceEntity(db_response)
    return response
}