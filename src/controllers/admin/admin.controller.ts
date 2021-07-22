import { Context } from 'koa'
import moment from 'moment'

import * as facebookService from '../../services/admin/facebook.service'
import * as googleService from '../../services/admin/google.service'
import * as linkedInService from '../../services/admin/linkedin.service'
import * as slackService from '../../services/admin/slack.service'
import * as fileService from '../../services/admin/file.service'
import * as paymentService from '../../services/admin/payment.service'
import { User } from '../../types'

const getAccessTokenBySSO = async (sso: string, token: string, role: string) => {
    switch (sso) {
        case 'linkedin':
            return await linkedInService.getAccessToken(token, role)
        case 'slack':
            return await slackService.getAccessToken(token, role)
        case 'facebook':
            return await facebookService.getAccessToken(token, role)
    }
}

const getProfileBySSO = async (sso: string, token: string, institutionCode: string, userId?: string) => {
    switch (sso) {
        case 'linkedin':
            return await linkedInService.getProfile(token, institutionCode)
        case 'slack':
            return await slackService.getProfile(token, institutionCode)
        case 'facebook':
            return await facebookService.getProfile(token, institutionCode)
    }
}

export const getAccessToken = async (ctx: Context) => {
    const { token, sso, role } = ctx.params
    const result = await getAccessTokenBySSO(sso, token, role) as any
    ctx.body = result.data
}

export const getProfile = async (ctx: Context) => {
    const { token, sso, role, userId } = ctx.params
    const { institutionCode } = ctx.headers
    const result = await getProfileBySSO(sso, token, institutionCode as string, userId)
    ctx.body = result
}

export const getGoogleProfile = async (ctx: Context) => {
    const { institutionCode } = ctx.headers
    const result = await googleService.getProfile(institutionCode as string, ctx.request.body as User)
    ctx.body = result
}

export const getAssetList = async (ctx: Context) => {
    const { asset } = ctx.params
    const result = await fileService.handleListAsset(asset)
    ctx.body = result.Contents
}

export const getPayment = async (ctx: Context) => {
    const { amount, currency } = ctx.params
    const result = await paymentService.getPaymentKey(amount, currency)
    ctx.body = result
}

export const getTodaysDate = async (ctx: Context) => {
    const date = moment().format()
    ctx.body = date
}