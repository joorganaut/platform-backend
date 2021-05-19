import { EventAttendee, EventAttendeeEntity } from '../../types'

export const mapEventAttendeeFromEventAttendeeEntity = (entity: EventAttendeeEntity): EventAttendee => {

    return {
        id: entity.id,
        attendeeId: entity.attendee_id,
        eventId: entity.event_id,
        paymentStatus: entity.payment_status
    }
}

export const mapEventAttendeeEntityFromEventAttendee = (eventAttendee: EventAttendee): EventAttendeeEntity => {
    
    return {
        attendee_id: eventAttendee.attendeeId,
        event_id: eventAttendee.eventId,
        payment_status: eventAttendee.paymentStatus,
    }
}