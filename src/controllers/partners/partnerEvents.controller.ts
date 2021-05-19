import { Context } from 'koa'

import { PartnerEvent } from 'types'
import * as partnerEventService from '../../services/partners/partnerEvents.service'

export const getAllPartnerEvents =  async (ctx: Context) => {
    const result: PartnerEvent[] = await partnerEventService.fetchPartnerEvents()
    ctx.body = result
}

export const getPartnerEvent = async (ctx: Context) => {
    const {partnerEventId, partnerId} = ctx.params
    const partnerEvent: PartnerEvent = await partnerEventService.fetchPartnerEventById(partnerId, partnerEventId)
    ctx.body = partnerEvent
}

export const createPartnerEvent = async (ctx: Context) => {
    const partnerEvent = await partnerEventService.createPartnerEvent(ctx.request.body)
    ctx.body = partnerEvent
}

export const updatePartnerEvent = async (ctx: Context) => {
    const { partnerEventId, partnerId } = ctx.params
    const partnerEvent = await partnerEventService.updatePartnerEvent(partnerId, partnerEventId, ctx.request.body)
    ctx.body = partnerEvent
}

export const deletePartnerEvent = async (ctx: Context) => {
    const { partnerEventId, partnerId } = ctx.params
    const partnerEvent = await partnerEventService.deletePartnerEvent(partnerId, partnerEventId)
    ctx.body = partnerEvent
}