import { db } from '../../server/db'
import { NoteEntity, NoteType, PagingParams } from '../../types'

const TABLE_NAME = 'notes'

const columns = [
    'id',
    'name',
    'type',
    'status',
    'description',
    'is_recurring',
    'interval',
    'user',
    'startDate',
    'endDate'
]

export const fetchNotes = async (institutionCode: string, params?: PagingParams): Promise<NoteEntity[] | any> => {
    if (params) {
        const offSet = ((params.page < 1 ? 1 : params.page) - 1) * params.pageSize
        const [count] = await db<NoteEntity>(TABLE_NAME).count('id').whereNull('deleted_at').where('institution_code', institutionCode)
        params.totalCount = count['count'] as number
        const result = await db<NoteEntity>(TABLE_NAME).whereNull('deleted_at').where('institution_code', institutionCode).offset(offSet).limit(params.pageSize).select(columns).orderBy(params.sort, params.dir)
        params.data = result
        return params
    }
    return await db<NoteEntity>(TABLE_NAME).whereNull('deleted_at').where('institution_code', institutionCode).select(columns)
}

export const fetchNoteById = async (NoteId: string, institutionCode: string): Promise<NoteEntity> => await db<NoteEntity>(TABLE_NAME).whereNull('deleted_at').where('id', NoteId).where('institution_code', institutionCode).first(columns)

export const fetchNoteByName = async (name: string, institutionCode: string): Promise<NoteEntity> => await db<NoteEntity>(TABLE_NAME).whereNull('deleted_at').where('name', name).where('institution_code', institutionCode).first(columns)

export const fetchNotesByType = async (type: NoteType, institutionCode: string): Promise<NoteEntity[]> => await db<NoteEntity>(TABLE_NAME).whereNull('deleted_at').where('type', type).where('institution_code', institutionCode)

export const createNote = async (Note: NoteEntity): Promise<NoteEntity[]> => await db<NoteEntity>(TABLE_NAME).insert({ ...Note, updated_at: db.raw('now()'), created_at: db.raw('now()') }, columns)

export const updateNote = async (NoteId: string, Note: NoteEntity, institutionCode: string): Promise<NoteEntity[]> => await db<NoteEntity>(TABLE_NAME)
    .where('id', NoteId)
    .where('institution_code', institutionCode)
    .whereNull('deleted_at')
    .update({ ...Note, updated_at: db.raw('now()') }, columns)

export const deleteNote = async (NoteId: string, institutionCode: string): Promise<NoteEntity[]> => await db<NoteEntity>(TABLE_NAME)
    .where('id', NoteId)
    .where('institution_code', institutionCode)
    .update({ updated_at: db.raw('now()'), deleted_at: db.raw('now()') }, columns)