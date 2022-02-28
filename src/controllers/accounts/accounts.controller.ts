import { Context } from 'koa'
import { Account } from '../../types'
import * as service from '../../services/accounts/accounts.service'


export const getAllAccounts = async (ctx: Context) => {
    const { institutioncode } = ctx.headers
    const result = await service.fetchAllAccounts(institutioncode as string)
    ctx.body = result
}


export const getAccount = async (ctx: Context) => {
    const { institutioncode } = ctx.headers
    const { id } = ctx.params
    const result = await service.fetchAccount(id, institutioncode as string)
    ctx.body = result
}

export const saveAccount = async (ctx: Context) => {
    const { institutioncode } = ctx.headers
    const client = ctx.request.body
    const result: Account = await service.saveAccount(client, institutioncode as string)
    ctx.body = result
}
export const updateAccount = async (ctx: Context) => {
    const { institutioncode } = ctx.headers
    const client = ctx.request.body
    const { id } = ctx.params
    const result: Account = await service.updateAccount(id, client, institutioncode as string)
    ctx.body = result
}
export const deleteAccount = async (ctx: Context) => {
    const { institutioncode } = ctx.headers
    const { id } = ctx.params
    const result: Account = await service.deleteAccount(id, institutioncode as string)
    ctx.body = result
}

// export const getAccounts = async (ctx: Context) => {
//     const { key, source } = ctx.params
//     const result: Account[] = await getAccountsBySource(source, key)
//     ctx.body = result
// }
