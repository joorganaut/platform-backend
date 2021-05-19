import { Entity, BusinessObject } from "../admin/default.types"

export interface ContentActivity extends BusinessObject {
    id?: string
    contentId: string
    type: string
    typeValue: string
}

export interface ContentActivityEntity extends Entity {
    id?: string
    content_id: string
    type: string
    type_value: string

}