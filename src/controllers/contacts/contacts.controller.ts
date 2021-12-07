import { Context } from 'koa'
import { Contact } from '../../types'
import * as service from '../../services/contacts/contacts.service'


const getContactsBySource = async (source: string, key?: string) => {
    let result: Contact[] = []
    switch (source) {
        case 'google':
            result = await service.fetchGoogleContacts(key as string)
            break
        case 'linkedIn':
            break
        case 'csv':
            break
    }
    return result
}

export const getAllContacts = async (ctx: Context) => {
    const { institutioncode } = ctx.headers
    const result = await service.fetchAllContacts(institutioncode as string)
    ctx.body = result
}

export const saveBulkContacts = async (ctx: Context) => {
    const { institutioncode } = ctx.headers
    ctx.body = service.saveBulkContacts(ctx.request.body, institutioncode as string)
}

export const getContact = async (ctx: Context) => {
    const { institutioncode } = ctx.headers
    const { id } = ctx.params
    const result = await service.fetchContact(id, institutioncode as string)
    ctx.body = result
}

export const saveContact = async (ctx: Context) => {
    const { institutioncode } = ctx.headers
    const client = ctx.request.body
    const result: Contact[] = await service.saveContact(client, institutioncode as string)
    ctx.body = result
}
export const updateContact = async (ctx: Context) => {
    const { institutioncode } = ctx.headers
    const client = ctx.request.body
    const { id } = ctx.params
    const result: Contact = await service.updateContact(id, client, institutioncode as string)
    ctx.body = result
}
export const deleteContact = async (ctx: Context) => {
    const { institutioncode } = ctx.headers
    const { id } = ctx.params
    const result: Contact = await service.deleteContact(id, institutioncode as string)
    ctx.body = result
}

export const getContacts = async (ctx: Context) => {
    const { key, source } = ctx.params
    const result: Contact[] = await getContactsBySource(source, key)
    ctx.body = result
}
