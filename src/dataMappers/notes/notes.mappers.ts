import { Note, NoteEntity, NoteType, ProjectItem } from '../../types'

/*
export interface Note extends BusinessObject {
    name: string
    type: NoteType
    status: NoteStatus
    description: string
    isRecurring: boolean
    interval: any
    user?: string
    startDate?: Date
    endDate?: Date
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
        institutionCode: entity.institution_code,
        user: entity.user,
        startDate: entity.startDate,
        endDate: entity.endDate
    }
}

export const mapNoteEntityFromNote = (Note: Note, institutionCode: string): NoteEntity => {

    return {
        name: Note.name,
        type: Note.type,
        status: Note.status,
        description: Note.description,
        is_recurring: Note.isRecurring,
        interval: Note.interval,
        institution_code: institutionCode,
        user: Note.user,
        startDate: Note.startDate,
        endDate: Note.endDate
    }
}

export const mapNoteFromProjectItem = (item: ProjectItem, params: { name: string, description: string, institution_code: string }): Note => {
    return {
        name: item.name as string,
        type: NoteType.task,
        status: item?.status,
        description: params.description,
        isRecurring: false,
        interval: 0,
        institutionCode: params.institution_code,
        user: item.userId,
        startDate: item.startDate,
        endDate: item.endDate
    }
}

export const mapNoteEntityFromProjectItem = (item: ProjectItem, params: { name: string, description: string, institution_code: string }): NoteEntity => {
    return {
        name: item.name as string,
        type: NoteType.task,
        status: item?.status,
        description: params.description,
        is_recurring: false,
        interval: 0,
        institution_code: params.institution_code,
        user: item.userId,
        startDate: item.startDate,
        endDate: item.endDate
    }
}