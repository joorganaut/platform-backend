import { Context } from 'koa'

import * as linkedInService from '../../services/admin/linkedin.service'
import * as slackService from '../../services/admin/slack.service'
import * as facebookService from '../../services/admin/facebook.service'
import * as googleService from '../../services/admin/google.service'
import * as fileService from '../../services/admin/file.service'
import { User } from 'types'


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

const getProfileBySSO = async (sso: string, token: string, role: string, userId?: string) => {
    switch (sso) {
        case 'linkedin':
            return await linkedInService.getProfile(token, role)
        case 'slack':
            return await slackService.getProfile(token, role)
        case 'facebook':
            return await facebookService.getProfile(userId as string, token, role)
    }
}

export const getAccessToken = async (ctx: Context) => {
    const { token, sso, role } = ctx.params
    const result = await getAccessTokenBySSO(sso, token, role) as any
    ctx.body = result.data
}

export const getProfile = async (ctx: Context) => {
    const { token, sso, role, userId } = ctx.params
    const result = await getProfileBySSO(sso, token, role, userId)
    ctx.body = result
}

export const getGoogleProfile = async (ctx: Context) => {
    const result = await googleService.getProfile(ctx.request.body as User)
    ctx.body = result
}

export const getAssetList = async (ctx: Context) => {
    const { asset } = ctx.params
    const result = await fileService.handleListAsset(asset)
    ctx.body = result.Contents
}