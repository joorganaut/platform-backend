import { Context } from 'koa'
import { Invoice } from '../../types'
import * as service from '../../services/invoices/invoices.service'


export const getAllInvoices = async (ctx: Context) => {
    const { institutioncode } = ctx.headers
    const result = await service.fetchAllInvoices(institutioncode as string)
    ctx.body = result
}


export const getInvoice = async (ctx: Context) => {
    const { institutioncode } = ctx.headers
    const { id } = ctx.params
    const result = await service.fetchInvoice(id, institutioncode as string)
    ctx.body = result
}

export const saveInvoice = async (ctx: Context) => {
    const { institutioncode } = ctx.headers
    const client = ctx.request.body
    const result: Invoice = await service.saveInvoice(client, institutioncode as string)
    ctx.body = result
}
export const updateInvoice = async (ctx: Context) => {
    const { institutioncode } = ctx.headers
    const client = ctx.request.body
    const { id } = ctx.params
    const result: Invoice = await service.updateInvoice(id, client, institutioncode as string)
    ctx.body = result
}
export const deleteInvoice = async (ctx: Context) => {
    const { institutioncode } = ctx.headers
    const { id } = ctx.params
    const result: Invoice = await service.deleteInvoice(id, institutioncode as string)
    ctx.body = result
}