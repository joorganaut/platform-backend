import { Context } from 'koa'

import * as linkedInService from '../../services/admin/linkedin.service'
import * as slackService from '../../services/admin/slack.service'
import * as fileService from '../../services/admin/file.service'

export const getAccessToken = async (ctx: Context) => {
    const { token, sso, role } = ctx.params
    const result = sso === 'linkedin' ? await linkedInService.getAccessToken(token, role) : await slackService.getAccessToken(token, role)
    ctx.body = result.data
}

export const getProfile = async (ctx: Context) => {
    const { token, sso, role } = ctx.params
    const result = sso === 'linkedin' ? await linkedInService.getProfile(token, role) : await slackService.getProfile(token, role)
    ctx.body = result
}

export const getAssetList = async (ctx: Context) => {
    const { asset } = ctx.params
    const result = await fileService.handleListAsset(asset)
    ctx.body = result.Contents
}