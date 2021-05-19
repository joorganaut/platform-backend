import { Entity, BusinessObject } from "../admin/default.types"

export interface ApplicationMetaData extends BusinessObject {
    id?: string
    name?: string
    value?: any[]
    type?: string
    enabled?: boolean
    expiryDate?: string
}

export interface ApplicationMetaDataEntity extends Entity {
    id?: string
    name?: string
    value?: string | any[]
    type?: string
    enabled?: boolean
    expiry_date?: string
}