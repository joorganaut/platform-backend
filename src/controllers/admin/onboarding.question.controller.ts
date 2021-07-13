import { Context } from 'koa'

import { PagingParams, OnboardingQuestion } from '../../types'
import * as onboardingQuestionService from '../../services/admin/onboarding.question.service'

export const getAllOnboardingQuestion = async (ctx: Context) => {
    const query = ctx.query as any
    const params: PagingParams | undefined = query.page !== undefined ? { page: query.page, pageSize: query.pageSize, dir: query.dir, sort: query.sort } : undefined
    const result: OnboardingQuestion[] | any = await onboardingQuestionService.fetchAllQuestions(params)
    ctx.body = result
}

export const getAllOnboardingQuestionByRole = async (ctx: Context) => {
    const { role } = ctx.params
    const onboardingQuestions = await onboardingQuestionService.findOnboardingQuestionsByRole(role)
    ctx.body = onboardingQuestions
}

export const getOnboardingQuestion = async (ctx: Context) => {
    const { onboardingQuestionId } = ctx.params
    const onboardingQuestion: OnboardingQuestion = await onboardingQuestionService.findOnboardingQuestionById(onboardingQuestionId)
    ctx.body = onboardingQuestion
}

export const createOnboardingQuestion = async (ctx: Context) => {
    const onboardingQuestion = await onboardingQuestionService.createOnboardingQuestion(ctx.request.body)
    ctx.body = onboardingQuestion
}

export const updateOnboardingQuestion = async (ctx: Context) => {
    const { onboardingQuestionId } = ctx.params
    const onboardingQuestion = await onboardingQuestionService.updateOnboardingQuestion(onboardingQuestionId, ctx.request.body)
    ctx.body = onboardingQuestion
}

export const deleteOnboardingQuestion = async (ctx: Context) => {
    const { onboardingQuestionId } = ctx.params
    const onboardingQuestion = await onboardingQuestionService.deleteOnboardingQuestion(onboardingQuestionId)
    ctx.body = onboardingQuestion
}