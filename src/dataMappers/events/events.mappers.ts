import { Event, EventEntity } from '../../types'

export const mapEventFromEventEntity = (entity: EventEntity): Event => {

    return {   
        id: entity.id,
        title: entity.title,
        description: entity.description,
        speakerDetails: JSON.parse(entity.speaker_details as string) || entity.speaker_details,
        date: entity.date,
        showKey: entity.show_key,
        status: entity.status,
        registrationLink: entity.registration_link,
        loginLink: entity.login_link,
        price: entity.price
    }
}

export const mapEventEntityFromEvent = (event: Event): EventEntity => {

    return {
        title: event.title,
        description:event.description,
        speaker_details: JSON.stringify(event.speakerDetails) || event.speakerDetails,
        date: event.date,
        show_key: event.showKey,
        status: event.status,
        registration_link: event.registrationLink,
        login_link: event.loginLink,
        price: event.price
    }
}