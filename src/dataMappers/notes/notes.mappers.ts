import { Note, NoteEntity } from '../../types'

/*
export interface Note extends BusinessObject {
    name: string
    type: NoteType
    status: NoteStatus
    description: string
    isRecurring: boolean
    interval: any
}

export interface NoteEntity extends BusinessObject {
    name: string
    type: NoteType
    status: NoteStatus
    description: string
    is_recurring: boolean
    interval: any
}
*/

export const mapNoteFromNoteEntity = (entity: NoteEntity): Note => {

    return {
        id: entity.id,
        name: entity.name,
        type: entity.type,
        status: entity.status,
        description: entity.description,
        isRecurring: entity.is_recurring,
        interval: entity.interval,
        institutionCode: entity.institution_code

    }
}

export const mapNoteEntityFromNote = (Note: Note): NoteEntity => {

    return {
        name: Note.name,
        type: Note.type,
        status: Note.status,
        description: Note.description,
        is_recurring: Note.isRecurring,
        interval: Note.interval,
        institution_code: Note.institutionCode
    }
}