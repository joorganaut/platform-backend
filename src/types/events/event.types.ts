import { Entity, BusinessObject } from "../admin/default.types"

export interface Event extends BusinessObject {
    id?: string
    title: string
    description:string
    speakerDetails: any[]
    date: Date
    showKey: string
    status: string
    registrationLink: string
    loginLink: string
    price: number
}

export interface EventEntity extends Entity {
    id?: string
    title: string
    description:string
    speaker_details: string | any[]
    date: Date
    show_key: string
    status: string
    registration_link: string
    login_link: string
    price: number

}