import Router from 'koa-router'
import { getAllOnboardingQuestion, getAllOnboardingQuestionByRole, getOnboardingQuestion, createOnboardingQuestion, updateOnboardingQuestion, deleteOnboardingQuestion } from '../../controllers/admin/onboarding.question.controller'

const router = new Router({
    prefix: '/onboarding-question'
})

router.get('/', getAllOnboardingQuestion)
router.get('/:onboardingQuestionId', getOnboardingQuestion)
router.get('/role/:role', getAllOnboardingQuestionByRole)
router.post('/', createOnboardingQuestion)

router.put('/:onboardingQuestionId', updateOnboardingQuestion)
router.delete('/:onboardingQuestionId', deleteOnboardingQuestion)

export default router