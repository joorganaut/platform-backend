import { Preference, PreferenceEntity } from '../../types'

export const mapPreferenceFromPreferenceEntity = (entity: PreferenceEntity): Preference => {

    return {
        id: entity.id,
        profileId: entity.profile_id,
        instantNotificationsEmail: entity.instant_notifications_email,
        dailySummaryEmail: entity.daily_summary_email,
        eventsEmail: entity.events_email
    }
}

export const mapPreferenceEntityFromPreference = (preference: Preference): PreferenceEntity => {

    return {
        profile_id: preference.profileId,
        instant_notifications_email: preference.instantNotificationsEmail,
        daily_summary_email: preference.dailySummaryEmail,
        events_email: preference.eventsEmail
    }
}