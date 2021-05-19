import { Context } from 'koa'

import { ContentActivity } from 'types'
import * as contentActivityService from '../../services/contents/contentActivity.service'

export const getContentActivity = async (ctx: Context) => {
    const { contentId, activityId } = ctx.params
    const contentActivity: ContentActivity = await contentActivityService.fetchContentActivityById(contentId, activityId)
    ctx.body = contentActivity
}

export const getReactionCount =  async (ctx: Context) => {
    const { contentId } = ctx.params
    const reactionCount: any[] = await contentActivityService.fetchReactionCount(contentId)
    ctx.body = reactionCount
}

export const createContentActivity = async (ctx: Context) => {
    const { userId } = ctx.params
    const contentActivity = await contentActivityService.createContentActivity(ctx.request.body, userId)
    ctx.body = contentActivity
}

export const updateContentActivity = async (ctx: Context) => {
    const { contentId, activityId } = ctx.params
    const contentActivity = await contentActivityService.updateContentActivity(contentId, activityId, ctx.request.body)
    ctx.body = contentActivity
}

export const deleteContentActivity = async (ctx: Context) => {
    const { contentId, activityId } = ctx.params
    const contentActivity = await contentActivityService.deleteContentActivity(contentId, activityId)
    ctx.body = contentActivity
}

    /*------ Comment Methods  ------*/

export const getComment = async (ctx: Context) => {
    const { commentId, contentId } = ctx.params
    const comment: ContentActivity = await contentActivityService.fetchCommentById(contentId, commentId)
    ctx.body = comment
}

export const createComment = async (ctx: Context) => {
    const { userId } = ctx.params
    ctx.request.body.type = "comment"
    const comment = await contentActivityService.createComment(ctx.request.body, userId)
    ctx.body = comment
}

export const updateComment = async (ctx: Context) => {
    const { userId, commentId, contentId } = ctx.params
    const comment = await contentActivityService.updateComment(commentId, userId, ctx.request.body, contentId)
    ctx.body = comment
}

export const deleteComment = async (ctx: Context) => {
    const { userId, commentId, contentId } = ctx.params
    const comment = await contentActivityService.deleteComment(commentId, userId, contentId)
    ctx.body = comment
}

    /*------ Reaction Methods ------*/

export const createReaction = async (ctx: Context) => {
    ctx.request.body.type = "reaction"
    const reaction = await contentActivityService.createReaction(ctx.request.body)
    ctx.body = reaction
}

export const updateReaction = async (ctx: Context) => {
    const { reactionId, contentId } = ctx.params
    const reaction = await contentActivityService.updateReaction(contentId, reactionId, ctx.request.body)
    ctx.body = reaction
}

export const deleteReaction = async (ctx: Context) => {
    const { reactionId, contentId } = ctx.params
    const reaction = await contentActivityService.deleteReaction(contentId, reactionId)
    ctx.body = reaction
}