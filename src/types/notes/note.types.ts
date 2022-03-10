import { BusinessObject, Entity } from "../../types/admin/default.types"

export enum NoteType {
    meeting,
    reminder,
    event,
    task,
    project,
    expense,
    payment,
    appointment
}
export type NoteTypeFilter = 'meeting' |
    'reminder' |
    'event' |
    'task' |
    'project' |
    'expense' |
    'payment' |
    'appointment'

export enum NoteStatus {
    todo,
    started,
    completed,
    cancelled,
    blocked
}

export interface Note extends BusinessObject {
    name: string
    type: NoteType
    status?: NoteStatus
    description: string
    isRecurring: boolean
    user?: string
    startDate?: Date
    endDate?: Date
    interval: any
}

export interface NoteEntity extends Entity {
    name: string
    type: NoteType
    status?: NoteStatus
    description: string
    is_recurring: boolean
    interval: any
    user?: string
    startDate?: Date
    endDate?: Date
}

export interface Calendar {
    startTime: Date
    endTime: Date
    summary: string
    description: string
    location: string
    url: string
    name: string | string[]
    email: string
}