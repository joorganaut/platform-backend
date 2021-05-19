import { Context } from 'koa'

import { Profile } from 'types'
import * as profileService from '../../services/users/profiles.service'

export const getAllProfiles = async (ctx: Context) => {
    const result: Profile[] = await profileService.fetchProfiles()
    ctx.body = result
}

export const getProfile = async (ctx: Context) => {
    const { userId } = ctx.params
    const profile: Profile | null = await profileService.findProfileByUserId(userId)
    ctx.body = profile
}

export const createProfile = async (ctx: Context) => {
    const profile = await profileService.createProfile(ctx.request.body)
    ctx.body = profile
}

export const updateProfile = async (ctx: Context) => {
    const { userId } = ctx.params
    const profile = await profileService.updateProfile(userId, ctx.request.body)
    ctx.body = profile
}

export const deleteProfile = async (ctx: Context) => {
    const { userId } = ctx.params
    const profile = await profileService.deleteProfile(userId)
    ctx.body = profile
}