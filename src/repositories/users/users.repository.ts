import { db } from '../../server/db'
import { UserEntity, PagingParams } from '../../types'

const TABLE_NAME = 'users'

const columns = [
    'id',
    'username',
    'first_name',
    'last_name',
    'password',
    'auth_type',
    'cognito_id',
    'enabled',
    'role',
    'is_onboarded',
    'institution_code',
    'image',
    'onboarding_questions',
    'sso_type',
    'verification_link',
    'access_token',
    'signout_requested',
    'transaction_pin',
    'is_authenticated',
    'force_password_change',
    'force_pin_change',
    'last_login_date',
    'number_of_failed_attempts'
]

export const fetchUsers = async (institutionCode: string, params?: PagingParams): Promise<UserEntity[] | any> => {
    if (params) {
        const offSet = ((params.page < 1 ? 1 : params.page) - 1) * params.pageSize
        const [count] = await db<UserEntity>(TABLE_NAME).count('id').whereNull('deleted_at').where('institution_code', institutionCode)
        params.totalCount = count['count'] as number
        const result = await db<UserEntity>(TABLE_NAME).whereNull('deleted_at').where('institution_code', institutionCode).offset(offSet).limit(params.pageSize).select(columns).orderBy(params.sort, params.dir)
        params.data = result
        return params
    }
    return await db<UserEntity>(TABLE_NAME).whereNull('deleted_at').where('institution_code', institutionCode).select(columns)
}

export const fetchUserByIdWithInstitutionCode = async (userId: string, institutionCode: string): Promise<UserEntity> => await db<UserEntity>(TABLE_NAME).whereNull('deleted_at').where('id', userId).where('institution_code', institutionCode).first(columns)

export const fetchUserById = async (userId: string): Promise<UserEntity> => await db<UserEntity>(TABLE_NAME).whereNull('deleted_at').where('id', userId).first(columns)

export const fetchUserByEmail = async (email: string, institutionCode: string): Promise<UserEntity> => {
    if (institutionCode) {
        return await db<UserEntity>(TABLE_NAME).whereNull('deleted_at').where('username', email)
            .where('institution_code', institutionCode).first(columns)
    }
    return await db<UserEntity>(TABLE_NAME).whereNull('deleted_at').where('username', email)
        .first(columns)
}


export const createUser = async (user: UserEntity): Promise<UserEntity[]> => await db<UserEntity>(TABLE_NAME).insert({ ...user, updated_at: db.raw('now()'), created_at: db.raw('now()') }, columns)

export const updateUser = async (userId: string, user: UserEntity, institutionCode: string): Promise<UserEntity[]> => await db<UserEntity>(TABLE_NAME)
    .where('id', userId)
    .where('institution_code', institutionCode)
    .whereNull('deleted_at')
    .update({ ...user, updated_at: db.raw('now()') }, columns)

export const deleteUser = async (userId: string, institutionCode: string): Promise<UserEntity[]> => await db<UserEntity>(TABLE_NAME)
    .where('id', userId).where('institution_code', institutionCode)
    .update({ updated_at: db.raw('now()'), deleted_at: db.raw('now()') }, columns)