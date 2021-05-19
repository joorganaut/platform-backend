import { Context } from 'koa'

import { Partner } from 'types'
import * as partnerService from '../../services/partners/partners.service'

export const getAllPartners = async (ctx: Context) => {
    const result: Partner[] = await partnerService.fetchPartners()
    ctx.body = result
}

export const getPartner = async (ctx: Context) => {
    const { partnerId } =ctx.params
    const partner: Partner = await partnerService.findPartnerById(partnerId)
    ctx.body = partner
}

export const createPartner = async (ctx: Context) => {
    const partner = await partnerService.createPartner(ctx.request.body)
    ctx.body = partner
}

export const updatePartner = async (ctx: Context) => {
    const { partnerId } = ctx.params
    const partner = await partnerService.updatePartner(partnerId, ctx.request.body)
    ctx.body = partner
}

export const deletePartner = async (ctx: Context) => {
    const { partnerId } = ctx.params
    const partner = await partnerService.deletePartner(partnerId)
    ctx.body = partner
}