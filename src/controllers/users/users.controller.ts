import { Context } from 'koa'

import { PagingParams, User } from 'types'
import * as userService from '../../services/users/users.service'

export const getAllUsers = async (ctx: Context) => {
    const query = ctx.query as any
    const params: PagingParams = { page: query.page, pageSize: query.pageSize, dir: query.dir, sort: query.sort }
    const result: User[] | any = await userService.fetchUsers(params)
    ctx.body = result
}

export const getUser = async (ctx: Context) => {
    const { userId } = ctx.params
    const user: User = await userService.findUserById(userId)
    ctx.body = user
}

export const createUser = async (ctx: Context) => {
    const user = await userService.createUser(ctx.request.body)
    ctx.body = user
}

export const updateUser = async (ctx: Context) => {
    const { userId } = ctx.params
    const user = await userService.updateUser(userId, ctx.request.body)
    ctx.body = user
}

export const deleteUser = async (ctx: Context) => {
    const { userId, onlyCache } = ctx.params
    const user = await userService.deleteUser(userId, onlyCache)
    ctx.body = user
}

export const authenticateUser = async (ctx: Context) => {
    const { username, password } = ctx.request.body
    const user = await userService.loginUser(username, password)
    ctx.body = user
}

export const resetPassword = async (ctx: Context) => {
    const { email } = ctx.request.body
    const user = await userService.resetPassword(email)
    ctx.body = user
}

export const changePassword = async (ctx: Context) => {
    const { userId } = ctx.params
    const { password } = ctx.request.body
    const user = await userService.changePassword(userId, password)
    ctx.body = user
}

export const invite = async (ctx: Context) => {
    const { userId } = ctx.params
    const user = await userService.invite(userId, ctx.request.body)
    ctx.body = user
}

export const updateOnboardingQuestions = async (ctx: Context) => {
    const { userId } = ctx.params
    const user = await userService.updateOnboardingQuestions(userId, ctx.request.body)
    ctx.body = user
}