import { BusinessObject, Entity } from "../../types/admin/default.types";

export enum InvoiceStatus {
    sent,
    accepted,
    declined,
    draft,
    paid
}

export interface InvoiceContent {
    index: number
    name: string
    unitAmount: number
    description: string
    quantity: number
}

export interface Invoice extends BusinessObject {
    project?: string
    contact: string
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
    contact: string
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