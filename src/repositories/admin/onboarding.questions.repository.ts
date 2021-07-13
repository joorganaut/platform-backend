import { db } from '../../server/db'
import { OnboardingQuestionEntity, QuestionRole, PagingParams } from '../../types'

const TABLE_NAME = 'onboarding_questions'

const columns = [
    'id',
    'question',
    'role',
    'display_type',
    'options',
    'page',
    'page_order',
    'enabled',
    'required'
]

export const fetchAllOnboardingQuestions = async (params?: PagingParams): Promise<OnboardingQuestionEntity[] | any> => {
    if (params) {
        const offSet = ((params.page < 1 ? 1 : params.page) - 1) * params.pageSize
        const [count] = await db<OnboardingQuestionEntity>(TABLE_NAME).count('id').whereNull('deleted_at')
        params.totalCount = count['count'] as number
        const result = await db<OnboardingQuestionEntity>(TABLE_NAME).whereNull('deleted_at').offset(offSet).limit(params.pageSize).select(columns).orderBy(params.sort, params.dir)
        params.data = result
        return params
    }
    return await db<OnboardingQuestionEntity>(TABLE_NAME).whereNull('deleted_at').select(columns)
}

export const fetchOnboardingQuestionById = async (onboardingQuestionId: string): Promise<OnboardingQuestionEntity> => await db<OnboardingQuestionEntity>(TABLE_NAME).whereNull('deleted_at').where('id', onboardingQuestionId).first(columns)

export const fetchOnboardingQuestionByRole = async (role: QuestionRole): Promise<OnboardingQuestionEntity[]> => await db<OnboardingQuestionEntity>(TABLE_NAME).whereNull('deleted_at').where('role', role).select(columns)

export const createOnboardingQuestion = async (onboardingQuestion: OnboardingQuestionEntity): Promise<OnboardingQuestionEntity[]> => await db<OnboardingQuestionEntity>(TABLE_NAME).insert({ ...onboardingQuestion, updated_at: db.raw('now()'), created_at: db.raw('now()') }, columns)

export const updateOnboardingQuestion = async (onboardingQuestionId: string, onboardingQuestion: OnboardingQuestionEntity): Promise<OnboardingQuestionEntity[]> => await db<OnboardingQuestionEntity>(TABLE_NAME)
    .where('id', onboardingQuestionId)
    .whereNull('deleted_at')
    .update({ ...onboardingQuestion, updated_at: db.raw('now()') }, columns)

export const deleteOnboardingQuestion = async (onboardingQuestionId: string): Promise<OnboardingQuestionEntity[]> => await db<OnboardingQuestionEntity>(TABLE_NAME)
    .where('id', onboardingQuestionId)
    .update({ updated_at: db.raw('now()'), deleted_at: db.raw('now()') }, columns)

export const deleteAllOnboardingQuestions = async () => await db<OnboardingQuestionEntity>(TABLE_NAME).delete()
export const createBulkOnboardingQuestions = async (onboardingQuestionEntities: OnboardingQuestionEntity[]) => await db<OnboardingQuestionEntity>(TABLE_NAME).insert(onboardingQuestionEntities)