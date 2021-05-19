import { Raw } from "knex";

export interface Entity {
    created_at?: string | Raw
    deleted_at?: string | Raw
    updated_at?: string | Raw
}

export interface BusinessObject {
    id?: string
}

export interface PagingParams {
    page: number | 1
    pageSize: number | 10
    dir: 'asc' | 'desc'
    sort: string | 'id'
    totalCount?: number
    data?: any[]
}