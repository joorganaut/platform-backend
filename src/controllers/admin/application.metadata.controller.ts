import { Context } from 'koa'

import { PagingParams, ApplicationMetaData } from '../../types'
import * as applicationMetaDataService from '../../services/admin/application.metadata.service'

export const getAllMetaData = async (ctx: Context) => {
    const query = ctx.query as any
    const params: PagingParams | undefined = query.page !== undefined ? { page: query.page, pageSize: query.pageSize, dir: query.dir, sort: query.sort } : undefined
    const result: ApplicationMetaData[] = await applicationMetaDataService.fetchAllMetaData(params)
    ctx.body = result
}

export const getMetaData = async (ctx: Context) => {
    const { applicationMetaDataId } = ctx.params
    const applicationMetaData: ApplicationMetaData = await applicationMetaDataService.findMetaDataById(applicationMetaDataId)
    ctx.body = applicationMetaData
}

export const createMetaData = async (ctx: Context) => {
    const applicationMetaData = await applicationMetaDataService.createMetaData(ctx.request.body)
    ctx.body = applicationMetaData
}

export const updateMetaData = async (ctx: Context) => {
    const { applicationMetaDataId } = ctx.params
    const applicationMetaData = await applicationMetaDataService.updateMetaData(applicationMetaDataId, ctx.request.body)
    ctx.body = applicationMetaData
}

export const deleteMetaData = async (ctx: Context) => {
    const { applicationMetaDataId } = ctx.params
    const applicationMetaData = await applicationMetaDataService.deleteMetaData(applicationMetaDataId)
    ctx.body = applicationMetaData
}