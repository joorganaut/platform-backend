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
    'is_onboarded',
    'deleted_at',
    'created_at',
    'updated_at',
    'image',
    'role',
    'welcomed',
    'sso_type',
    'verification_link',
    'onboarding_questions',
    'access_token'
]

export const fetchUsers = async (params?: PagingParams): Promise<UserEntity[] | any> => {
    if (params) {
        const offSet = ((params.page as number < 1 ? 1 : params.page) - 1) * params.pageSize
        const [count] = await db<UserEntity>(TABLE_NAME).count('id')
        params.totalCount = count['count'] as number
        const result = await db<UserEntity>(TABLE_NAME).whereNull('deleted_at').offset(offSet).limit(params.pageSize).select(columns).orderBy(params.sort, params.dir)
        params.data = result
        return params
    }
    return await db<UserEntity>(TABLE_NAME).whereNull('deleted_at').select(columns)
}

export const fetchUserById = async (userId: string): Promise<UserEntity> => await db<UserEntity>(TABLE_NAME).whereNull('deleted_at').where('id', userId).first(columns)

export const fetchUserByEmail = async (email: string): Promise<UserEntity> => await db<UserEntity>(TABLE_NAME).whereNull('deleted_at').where('username', email).first(columns)

export const createUser = async (user: UserEntity): Promise<UserEntity[]> => await db<UserEntity>(TABLE_NAME).insert({ ...user, updated_at: db.raw('now()'), created_at: db.raw('now()') }, columns)

export const updateUser = async (userId: string, user: UserEntity): Promise<UserEntity[]> => await db<UserEntity>(TABLE_NAME)
    .where('id', userId)
    .whereNull('deleted_at')
    .update({ ...user, updated_at: db.raw('now()') }, columns)

export const deleteUser = async (userId: string): Promise<UserEntity[]> => await db<UserEntity>(TABLE_NAME)
    .where('id', userId)
    .update({ updated_at: db.raw('now()'), deleted_at: db.raw('now()') }, columns)