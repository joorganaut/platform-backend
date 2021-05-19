import { Entity, BusinessObject } from "../admin/default.types"

export interface Preference extends BusinessObject {
    id?: string
    profileId: string
    instantNotificationsEmail: boolean
    dailySummaryEmail: boolean
    eventsEmail: boolean
}

export interface PreferenceEntity extends Entity {
    id?: string
    profile_id: string
    instant_notifications_email: boolean
    daily_summary_email: boolean
    events_email: boolean

}