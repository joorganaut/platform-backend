import { BusinessObject, Entity } from "../../types/admin/default.types"

export enum NoteType {
    meeting,
    reminder,
    event,
    task
}

export enum NoteStatus {
    started,
    running,
    ended,
    cancelled
}

export interface Note extends BusinessObject {
    name: string
    type: NoteType
    status: NoteStatus
    description: string
    isRecurring: boolean
    interval: any
}

export interface NoteEntity extends Entity {
    name: string
    type: NoteType
    status: NoteStatus
    description: string
    is_recurring: boolean
    interval: any
}