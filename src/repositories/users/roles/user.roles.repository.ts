import { db } from '../../../server/db'
import { UserRoleEntity, PagingParams } from '../../../types'

const TABLE_NAME = 'user_roles'

const columns = [
    'id',
    'user_id',
    'role_id',
    'role_name',
    'is_admin',
    'username'
]

export const fetchUserRoles = async (institutionCode: string, params?: PagingParams): Promise<UserRoleEntity[] | any> => {
    if (params) {
        const offSet = ((params.page as number < 1 ? 1 : params.page) - 1) * params.pageSize
        const [count] = await db<UserRoleEntity>(TABLE_NAME).count('id').whereNull('deleted_at').where('institution_code', institutionCode)
        params.totalCount = count['count'] as number
        const result = await db<UserRoleEntity>(TABLE_NAME).whereNull('deleted_at').where('institution_code', institutionCode).offset(offSet).limit(params.pageSize).select(columns).orderBy(params.sort, params.dir)
        params.data = result
        return params
    }
    return await db<UserRoleEntity>(TABLE_NAME).whereNull('deleted_at').where('institution_code', institutionCode).select(columns)
}

export const fetchUserRoleById = async (userRoleId: string, institutionCode: string): Promise<UserRoleEntity> => await db<UserRoleEntity>(TABLE_NAME).whereNull('deleted_at').where('id', userRoleId).where('institution_code', institutionCode).first(columns)

export const fetchUserRoleByUsername = async (username: string, institutionCode: string): Promise<UserRoleEntity[]> => await db<UserRoleEntity>(TABLE_NAME).whereNull('deleted_at').where('username', username).where('institution_code', institutionCode)

export const fetchUserRoleByUserId = async (userId: string, institutionCode: string): Promise<UserRoleEntity[]> => await db<UserRoleEntity>(TABLE_NAME).whereNull('deleted_at').where('user_id', userId).where('institution_code', institutionCode)

export const createUserRole = async (userRole: UserRoleEntity): Promise<UserRoleEntity[]> => await db<UserRoleEntity>(TABLE_NAME).insert({ ...userRole, updated_at: db.raw('now()'), created_at: db.raw('now()') }, columns)

export const updateUserRole = async (userRoleId: string, UserRole: UserRoleEntity, institutionCode: string): Promise<UserRoleEntity[]> => await db<UserRoleEntity>(TABLE_NAME)
    .where('id', userRoleId)
    .where('institution_code', institutionCode)
    .whereNull('deleted_at')
    .update({ ...UserRole, updated_at: db.raw('now()') }, columns)

export const deleteUserRole = async (userRoleId: string, institutionCode: string): Promise<UserRoleEntity[]> => await db<UserRoleEntity>(TABLE_NAME)
    .where('id', userRoleId)
    .where('institution_code', institutionCode)
    .update({ updated_at: db.raw('now()'), deleted_at: db.raw('now()') }, columns)