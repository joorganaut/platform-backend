import { Context } from 'koa'

import { PartnerContent } from 'types'
import * as partnerContentService from '../../services/partners/partnerContents.service'

export const getAllPartnerContents = async (ctx: Context) => {
    const result: PartnerContent[] = await partnerContentService.fetchPartnerContents()
    ctx.body = result
}

export const getPartnerContent = async (ctx: Context) => {
    const { partnerContentId, partnerId } = ctx.params
    const partnerContent: PartnerContent = await partnerContentService.fetchPartnerContentById(partnerId, partnerContentId)
    ctx.body = partnerContent
}

export const createPartnerContent = async (ctx: Context) => {
    const partnerContent = await partnerContentService.createPartnerContent(ctx.request.body)
    ctx.body = partnerContent
}

export const updatePartnerContent = async (ctx: Context) => {
    const { partnerContentId, partnerId } = ctx.params
    const partnerContent = await partnerContentService.updatePartnerContent(partnerId, partnerContentId, ctx.request.body)
    ctx.body = partnerContent
}

export const deletePartnerContent = async (ctx: Context) => {
    const { partnerContentId, partnerId } = ctx.params
    const partnerContent = await partnerContentService.deletePartnerContent(partnerId, partnerContentId)
    ctx.body = partnerContent
}