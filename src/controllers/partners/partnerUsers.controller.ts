import { Context } from 'koa'

import { PartnerUser } from 'types'
import * as partnerUserService from '../../services/partners/partnerUsers.service'

export const getAllPartnerUsers = async (ctx: Context) => {
    const result: PartnerUser[] = await partnerUserService.fetchPartnerUsers()
    ctx.body = result
}

export const getPartnerUser = async (ctx: Context) => {
    const { partnerUserId, partnerId } = ctx.params
    const partnerUser: PartnerUser = await partnerUserService.fetchPartnerUserById(partnerId, partnerUserId)
    ctx.body = partnerUser
}

export const createPartnerUser = async (ctx: Context) => {
    const partnerUser = await partnerUserService.createPartnerUser(ctx.request.body)
    ctx.body = partnerUser
}

export const updatePartnerUser = async (ctx: Context) => {
    const { partnerUserId, partnerId } = ctx.params
    const partnerUser = await partnerUserService.updatePartnerUser(partnerId, partnerUserId, ctx.request.body)
    ctx.body = partnerUser
}

export const deletePartnerUser = async (ctx: Context) => {
    const { partnerUserId, partnerId } = ctx.params
    const partnerUser = await partnerUserService.deletePartnerUser(partnerId, partnerUserId)
    ctx.body = partnerUser
}