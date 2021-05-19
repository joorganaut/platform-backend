import { Entity, BusinessObject } from "../admin/default.types"

export interface EventAttendee extends BusinessObject {
    id?: string
    attendeeId: string
    eventId: string
    paymentStatus: string
}

export interface EventAttendeeEntity extends Entity {
    id?: string
    attendee_id: string
    event_id: string
    payment_status: string
}