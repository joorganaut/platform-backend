import { Context } from 'koa'

import { Event } from 'types'
import * as eventService from '../../services/events/events.service'

export const getAllEvents = async (ctx: Context) => {
    const result: Event[] = await eventService.fetchEvents()
    ctx.body =result
}

export const getEvent = async (ctx: Context) => {
    const { eventId } = ctx.params
    const event: Event = await eventService.findEventById(eventId)
    ctx.body = event
}

export const createEvent = async (ctx: Context) => {
    const { userId } = ctx.params
    const event = await eventService.createEvent(ctx.request.body, userId)
    ctx.body = event
}

export const updateEvent = async (ctx: Context) => {
    const { eventId} = ctx.params
    const event = await eventService.updateEvent(eventId, ctx.request.body)
    ctx.body =event
}

export const deleteEvent = async (ctx: Context) => {
    const { eventId} = ctx.params
    const event = await eventService.deleteEvent(eventId)
    ctx.body =event
}