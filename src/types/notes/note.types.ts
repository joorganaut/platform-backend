import { BusinessObject } from "../../types/admin/default.types"

export enum NoteType {
    meeting,
    reminder,
    event
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

export interface Note extends BusinessObject {
    name: string
    type: NoteType
    status: NoteStatus
    description: string
    is_recurring: boolean
    interval: any
}