import { BusinessObject, Entity } from "../../types/admin/default.types";


export interface ProductService extends BusinessObject {
    name?: string
    description?: string
    cost?: number
    taxable?: boolean
    image?: string
    active?: boolean
    category?: string
    tags?: string
    currency?: string
}

export interface ProductServiceEntity extends Entity {
    name?: string
    description?: string
    cost?: number
    taxable?: boolean
    image?: string
    active?: boolean
    category?: string
    tags?: string
    currency?: string
}