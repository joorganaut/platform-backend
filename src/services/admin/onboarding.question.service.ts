import * as onboardingQuestionRepository from '../../repositories/admin/onboarding.questions.repository'
import { OnboardingQuestion, OnboardingQuestionEntity, QuestionRole, PagingParams } from '../../types'
import { mapOnboardingQuestionEntityFromOnboardingQuestion, mapOnboardingQuestionFromOnboardingQuestionEntity } from '../../dataMappers/admin/onboarding.question.mapper'
import { NotFoundError } from '../../lib'
import { memberQuestions } from './questions'


export const fetchAllQuestions = async (params?: PagingParams): Promise<OnboardingQuestion[]> => {
    const result = await onboardingQuestionRepository.fetchAllOnboardingQuestions(params)
    if (!params) {
        return (result as OnboardingQuestionEntity[])?.map(meta => mapOnboardingQuestionFromOnboardingQuestionEntity(meta))
    }
    return { ...result, data: result?.data?.map((meta: OnboardingQuestionEntity) => mapOnboardingQuestionFromOnboardingQuestionEntity(meta)) }
}

export const findOnboardingQuestionById = async (onboardingQuestionId: string): Promise<OnboardingQuestion> => {
    const data: OnboardingQuestionEntity = await onboardingQuestionRepository.fetchOnboardingQuestionById(onboardingQuestionId)

    if (!data) {
        throw new NotFoundError(__filename, `Onboarding Question with ID ${onboardingQuestionId} does not exist`)
    }
    return mapOnboardingQuestionFromOnboardingQuestionEntity(data)
}

export const findOnboardingQuestionsByRole = async (role: QuestionRole): Promise<OnboardingQuestion[] | null> => {
    if (!role) {
        return null
    }
    const questions = await onboardingQuestionRepository.fetchOnboardingQuestionByRole(role)
    if (!questions) {
        return null
    }
    return (questions as OnboardingQuestionEntity[])?.map(meta => mapOnboardingQuestionFromOnboardingQuestionEntity(meta))
}

export const createOnboardingQuestion = async (onboardingQuestion: OnboardingQuestion): Promise<OnboardingQuestion> => {

    const onboardingQuestionEntity = mapOnboardingQuestionEntityFromOnboardingQuestion(onboardingQuestion)
    const [db_response] = await onboardingQuestionRepository.createOnboardingQuestion(onboardingQuestionEntity)

    return mapOnboardingQuestionFromOnboardingQuestionEntity(db_response)
}

export const updateOnboardingQuestion = async (onboardingQuestionId: string, onboardingQuestion: OnboardingQuestion): Promise<OnboardingQuestion> => {
    const onboardingQuestionEntity = mapOnboardingQuestionEntityFromOnboardingQuestion(onboardingQuestion)
    const [db_response] = await onboardingQuestionRepository.updateOnboardingQuestion(onboardingQuestionId, onboardingQuestionEntity)
    return mapOnboardingQuestionFromOnboardingQuestionEntity(db_response)
}

export const deleteOnboardingQuestion = async (onboardingQuestionId: string): Promise<OnboardingQuestion> => {
    const [db_response] = await onboardingQuestionRepository.deleteOnboardingQuestion(onboardingQuestionId)
    return mapOnboardingQuestionFromOnboardingQuestionEntity(db_response)
}

export const deleteAllOnboardingQuestion = async () => {
    await onboardingQuestionRepository.deleteAllOnboardingQuestions()
}

export const preloadOnboardingQuestions = async () => {
    //clear existing onboarding questions
    await deleteAllOnboardingQuestion()
    //get all onboarding questions from file
    const data: OnboardingQuestionEntity[] = memberQuestions.map(meta => mapOnboardingQuestionEntityFromOnboardingQuestion(meta))
    //insert all
    await onboardingQuestionRepository.createBulkOnboardingQuestions(data)
}