import { BusinessObject, Entity } from "../../types/admin/default.types"



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