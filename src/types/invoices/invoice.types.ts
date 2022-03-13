import { BusinessObject, Entity } from "../../types/admin/default.types";

export enum InvoiceStatus {
    sent,
    accepted,
    declined,
    draft,
    paid
}

export interface InvoiceContent {
    index?: number
    productId: string
    name: string
    unitAmount?: number
    description: string
    quantity: number
}

export interface Invoice extends BusinessObject {
    projectId?: string
    contactId: string
    accountId: string
    status: InvoiceStatus
    description: string
    totalAmount: number
    hasTax: boolean
    taxContent?: any[]
    content?: InvoiceContent[]
    clientId: string
    expiryDate?: Date
    isRecurring: boolean
    interval?: any
}

export interface InvoiceEntity extends Entity {
    project?: string
    contact: string
    account: string
    status: InvoiceStatus
    description: string
    total_amount: number
    has_tax: boolean
    tax_content?: any[] | string
    content?: InvoiceContent[] | string
    client: string //client name
    expiry_date?: Date
    is_recurring: boolean
    interval?: any
}