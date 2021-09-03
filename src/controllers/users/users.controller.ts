import { Context } from 'koa'

import { PagingParams, User } from '../../types'
import * as userService from '../../services/users/users.service'

export const getAllUsers = async (ctx: Context) => {
    const query = ctx.query as any
    const { institutionCode } = ctx.headers
    const params: PagingParams | undefined = query.page !== undefined ? { page: query.page, pageSize: query.pageSize, dir: query.dir, sort: query.sort } : undefined
    const result: User[] | any = await userService.fetchUsers(institutionCode as string, params)
    ctx.body = result
}

export const getUser = async (ctx: Context) => {
    const { userId } = ctx.params
    const { institutionCode } = ctx.headers
    const user: User = await userService.findUserById(userId)
    ctx.body = user
}

export const createUser = async (ctx: Context) => {
    const { institutionCode } = ctx.headers
    const user = await userService.createUser(institutionCode as string, ctx.request.body)
    ctx.body = user
}

export const updateUser = async (ctx: Context) => {
    const { userId } = ctx.params
    const { institutionCode } = ctx.headers
    const user = await userService.updateUser(userId, ctx.request.body, institutionCode as string)
    ctx.body = user
}

export const deleteUser = async (ctx: Context) => {
    const { userId, onlyCache } = ctx.params
    const { institutionCode } = ctx.headers
    const user = await userService.deleteUser(institutionCode as string, userId, onlyCache)
    ctx.body = user
}

export const authenticateUser = async (ctx: Context) => {
    const { institutionCode } = ctx.headers
    const { username, password } = ctx.request.body
    const user = await userService.loginUser(username, password, institutionCode as string)
    ctx.body = user
}

export const resetPassword = async (ctx: Context) => {
    const { institutionCode } = ctx.headers
    const { email } = ctx.request.body
    const user = await userService.resetPassword(email, institutionCode as string)
    ctx.body = user
}

export const changePassword = async (ctx: Context) => {
    const { userId } = ctx.params
    const { institutionCode } = ctx.headers
    const { password } = ctx.request.body
    const user = await userService.changePassword(userId, password, institutionCode as string)
    ctx.body = user
}
