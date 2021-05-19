import { Context } from 'koa'

import { PagingParams, Content } from 'types'
import * as contentService from '../../services/contents/contents.service'

export const getAllContents = async (ctx: Context) => {
    const query = ctx.query as any
    const params: PagingParams = { page: query.page, pageSize: query.pageSize, dir: query.dir, sort: query.sort }
    const result: Content[] | any = await contentService.fetchContents(params)
    ctx.body = result
}

export const getContent = async (ctx: Context) => {
    const { contentId } = ctx.params
    const content: Content = await contentService.findContentByID(contentId)
    ctx.body = content
}

export const createContent = async (ctx: Context) => {
    const { userId } = ctx.params
    const content = await contentService.createContent(ctx.request.body, userId)
    ctx.body = content
}

export const updateContent = async (ctx: Context) => {
    const { userId, contentId } = ctx.params
    const content = await contentService.updateContent(contentId, userId, ctx.request.body)
    ctx.body = content
}

export const deleteContent = async (ctx: Context) => {
    const { userId, contentId } = ctx.params
    const content = await contentService.deleteContent(contentId, userId)
    ctx.body = content
}

export const reportContent = async (ctx: Context) => {
    const { contentId } = ctx.params
    const { report } =  ctx.request.body
    const content = await contentService.reportContent(contentId, report)
    ctx.body = content
}