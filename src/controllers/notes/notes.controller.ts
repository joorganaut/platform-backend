import { Context } from 'koa'
import { Note } from '../../types'
import * as service from '../../services/notes/notes.service'


export const getAllNotes = async (ctx: Context) => {
    const { institutioncode } = ctx.headers
    const result = await service.fetchAllNotes(institutioncode as string)
    ctx.body = result
}


export const getNote = async (ctx: Context) => {
    const { institutioncode } = ctx.headers
    const { id } = ctx.params
    const result = await service.fetchNote(id, institutioncode as string)
    ctx.body = result
}

export const saveNote = async (ctx: Context) => {
    const { institutioncode } = ctx.headers
    const client = ctx.request.body
    const result: Note = await service.saveNote(client, institutioncode as string)
    ctx.body = result
}
export const updateNote = async (ctx: Context) => {
    const { institutioncode } = ctx.headers
    const client = ctx.request.body
    const { id } = ctx.params
    const result: Note = await service.updateNote(id, client, institutioncode as string)
    ctx.body = result
}
export const deleteNote = async (ctx: Context) => {
    const { institutioncode } = ctx.headers
    const { id } = ctx.params
    const result: Note = await service.deleteNote(id, institutioncode as string)
    ctx.body = result
}

// export const getNotes = async (ctx: Context) => {
//     const { key, source } = ctx.params
//     const result: Note[] = await getNotesBySource(source, key)
//     ctx.body = result
// }
