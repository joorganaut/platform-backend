import { Raw } from "knex";

export interface Entity {
    id?: string
    created_at?: string | Raw
    deleted_at?: string | Raw
    updated_at?: string | Raw
    institution_code?: string
}

export interface BusinessObject {
    id?: string
    institutionCode?: string
}

export interface PagingParams {
    page: number | 1
    pageSize: number | 10
    dir: 'asc' | 'desc'
    sort: string | 'id'
    totalCount?: number
    data?: any[]
}

export interface Institution extends BusinessObject {
    name: string
    logo: string
    color: string
    backgroundColor: string
    website: string
    email: string
    phone: string
    industry: string
    passPhrase: string
    address: string
}

export interface InstitutionEntity extends Entity {
    name: string
    logo: string
    color: string
    background_color: string
    website: string
    email: string
    phone: string
    industry: string
    pass_phrase: string
    address: string
}