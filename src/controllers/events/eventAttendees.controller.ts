import { Context } from 'koa'

import { EventAttendee } from 'types'
import * as eventAttendeeService from '../../services/events/eventAttendees.service'

export const getAllEventAttendees = async (ctx: Context) => {
    const result: EventAttendee[] = await eventAttendeeService.fetchEventAttendees()
    ctx.body = result
}

export const getEventAttendee = async (ctx: Context) => {
    const { eventAttendeeId, eventId } = ctx.params
    const eventAttendee: EventAttendee = await eventAttendeeService.fetchEventAttendeeById(eventId, eventAttendeeId)
    ctx.body = eventAttendee
}

export const createEventAttendee = async (ctx: Context) => {
    const { userId } = ctx.params
    const eventAttendee = await eventAttendeeService.createEventAttende(ctx.request.body, userId)
    ctx.body = eventAttendee
}

export const updateEventAttendee = async (ctx: Context) => {
    const { eventAttendeeId, eventId } = ctx.params
    const eventAttendee = await eventAttendeeService.updateEventAttendee(eventId, eventAttendeeId, ctx.request.body)
    ctx.body = eventAttendee
}

export const deleteEventAttendee =  async (ctx:Context) => {
    const { eventAttendeeId, eventId } = ctx.params
    const eventAttendee =  await eventAttendeeService.deleteEventAttendee(eventId, eventAttendeeId)
    ctx.body = eventAttendee
}