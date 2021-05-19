import { Context } from 'koa'

import { Preference } from 'types'
import * as preferenceService from '../../services/users/preferences.service'

export const getAllPreferences = async (ctx: Context) => {
    const result: Preference[] = await preferenceService.fetchPreferences()
    ctx.body = result
}

export const getPreference = async (ctx: Context) => {
    const { preferenceId, profileId } = ctx.params
    const preference: Preference = await preferenceService.fetchPreferenceById(profileId, preferenceId)
    ctx.body = preference
}

export const createPreference = async (ctx: Context) => {
    const preference = await preferenceService.createPreference(ctx.request.body)
    ctx.body = preference
}

export const updatePreference = async (ctx: Context) => {
    const { preferenceId, profileId } = ctx.params
    const preference = await preferenceService.updatePreference(profileId, preferenceId, ctx.request.body)
    ctx.body = preference
}

export const deletePreference = async (ctx: Context) => {
    const { preferenceId, profileId } = ctx.params
    const preference = await preferenceService.deletePreference(profileId, preferenceId)
    ctx.body = preference
}