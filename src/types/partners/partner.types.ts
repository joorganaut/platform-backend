import { Entity, BusinessObject } from "../admin/default.types"

export interface Partner extends BusinessObject {
    id?: string
    name: string
    description: string
    enabled: boolean
    founded: string
    companySize: string
    
}

export interface PartnerEntity extends Entity {
    id?: string
    name: string
    description: string
    enabled: boolean
    founded: string
    company_size: string

}