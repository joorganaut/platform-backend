import { BusinessObject, Entity } from "../../types/admin/default.types"



export interface Contact extends BusinessObject {
    name?: string
    firstName?: string
    lastName?: string
    shortName?: string
    title?: string
    businessName?: string
    email?: string
    phone?: string
    workPhone?: string
    address?: string
    type?: string
    currency?: string
    taxType?: string
}

export interface ContactEntity extends Entity {
    name?: string
    first_name?: string
    last_name?: string
    short_name?: string
    title?: string
    business_name?: string
    email?: string
    phone?: string
    work_phone?: string
    address?: string
    type?: string
    currency?: string
    tax_type?: string
}