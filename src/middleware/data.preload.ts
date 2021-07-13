import { preloadOnboardingQuestions } from '../services/admin/onboarding.question.service'

export const dataPreload = async () => {
    await preloadOnboardingQuestions()
}