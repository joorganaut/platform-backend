import { Context } from 'koa'

import { UserContent } from 'types'
import * as userContentService from '../../services/users/userContents.service'

export const getAllUserContents = async (ctx: Context) => {
    const result: UserContent[] = await userContentService.fetchUserContents()
    ctx.body = result
}

export const getUserContent = async (ctx: Context) => {
    const { userContentId, profileId } = ctx.params
    const userContent: UserContent = await userContentService.fetchUserContentById(profileId, userContentId)
    ctx.body = userContent
}

export const createUserContent = async (ctx: Context) => {
    const userContent = await userContentService.createUserContent(ctx.request.body)
    ctx.body = userContent
}

export const updateUserContent = async (ctx: Context) => {
    const { userContentId, profileId } = ctx.params
    const userContent = await userContentService.updateUserContent(profileId, userContentId, ctx.request.body)
    ctx.body = userContent
}

export const deleteUserContent = async (ctx: Context) => {
    const { userContentId, profileId } = ctx.params
    const userContent = await userContentService.deleteUserContent(profileId, userContentId)
    ctx.body = userContent
}