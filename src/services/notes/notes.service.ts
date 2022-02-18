import { Note, NoteEntity } from '../../types'
import * as repository from '../../repositories/notes/notes.repository'
import { mapNoteFromNoteEntity, mapNoteEntityFromNote } from '../../dataMappers/notes/notes.mappers'


export const fetchAllNotes = async (institutionCode: string): Promise<Note[]> => {
    const NoteEntities: NoteEntity[] = await repository.fetchNotes(institutionCode)
    const result = NoteEntities.map(entity => mapNoteFromNoteEntity(entity))
    return result
}

export const fetchNote = async (NoteId: string, institutionCode: string): Promise<Note> => {
    const entity: NoteEntity = await repository.fetchNoteById(NoteId, institutionCode)
    const result = mapNoteFromNoteEntity(entity)
    return result
}

export const saveNote = async (Note: Note, institutionCode: string, callback?: (obj: any) => void) => {
    const NoteEntity: NoteEntity = mapNoteEntityFromNote(Note, institutionCode)
    const [response] = await repository.createNote(NoteEntity)
    if (callback) {
        callback(response.id)
    }
    return mapNoteFromNoteEntity(response)
}

export const updateNote = async (NoteId: string, Note: Note, institutionCode: string) => {
    const NoteEntity: NoteEntity = mapNoteEntityFromNote(Note, institutionCode)
    const [db_response] = await repository.updateNote(NoteId, NoteEntity, institutionCode)
    const response = mapNoteFromNoteEntity(db_response)
    return response
}

export const deleteNote = async (NoteId: string, institutionCode: string) => {
    const [db_response] = await repository.deleteNote(NoteId, institutionCode)
    const response = mapNoteFromNoteEntity(db_response)
    return response
}