import { OnboardingQuestion, OnboardingQuestionEntity } from '../../types'


export const mapOnboardingQuestionFromOnboardingQuestionEntity = (entity: OnboardingQuestionEntity): OnboardingQuestion => {

    return {
        id: entity.id,
        question: entity.question,
        role: entity.role,
        displayType: entity.display_type,
        options: entity.options as string[],
        page: entity.page,
        pageOrder: entity.page_order,
        enabled: entity.enabled,
        required: entity.required
    }

}

export const mapOnboardingQuestionEntityFromOnboardingQuestion = (onboardingQuestion: OnboardingQuestion): OnboardingQuestionEntity => {

    return {
        question: onboardingQuestion.question,
        role: onboardingQuestion.role,
        display_type: onboardingQuestion.displayType,
        options: JSON.stringify(onboardingQuestion.options),
        page: onboardingQuestion.page,
        page_order: onboardingQuestion.pageOrder,
        enabled: onboardingQuestion.enabled,
        required: onboardingQuestion.required
    }

}