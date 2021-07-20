import { db } from '../../../server/db'
import { UserFunctionEntity, PagingParams } from '../../../types'

const TABLE_NAME = 'user_functions'

const columns = [
    'id',
    'name',
    'action',
    'is_enabled'
]

export const fetchUserFunctions = async (params?: PagingParams): Promise<UserFunctionEntity[] | any> => {
    if (params) {
        const offSet = ((params.page as number < 1 ? 1 : params.page) - 1) * params.pageSize
        const [count] = await db<UserFunctionEntity>(TABLE_NAME).count('id').whereNull('deleted_at')
        params.totalCount = count['count'] as number
        const result = await db<UserFunctionEntity>(TABLE_NAME).whereNull('deleted_at').offset(offSet).limit(params.pageSize).select(columns).orderBy(params.sort, params.dir)
        params.data = result
        return params
    }
    return await db<UserFunctionEntity>(TABLE_NAME).whereNull('deleted_at').select(columns)
}

export const fetchUserFunctionById = async (userFunctionId: string): Promise<UserFunctionEntity> => await db<UserFunctionEntity>(TABLE_NAME).whereNull('deleted_at').where('id', userFunctionId).first(columns)

export const fetchUserFunctionByName = async (name: string, institutionCode: string): Promise<UserFunctionEntity> => await db<UserFunctionEntity>(TABLE_NAME).whereNull('deleted_at').where('name', name).first(columns)

export const createUserFunction = async (userFunction: UserFunctionEntity): Promise<UserFunctionEntity[]> => await db<UserFunctionEntity>(TABLE_NAME).insert({ ...userFunction, updated_at: db.raw('now()'), created_at: db.raw('now()') }, columns)

export const updateUserFunction = async (userFunctionId: string, userFunction: UserFunctionEntity): Promise<UserFunctionEntity[]> => await db<UserFunctionEntity>(TABLE_NAME)
    .where('id', userFunctionId)
    .whereNull('deleted_at')
    .update({ ...userFunction, updated_at: db.raw('now()') }, columns)

export const deleteUserFunction = async (userFunctionId: string): Promise<UserFunctionEntity[]> => await db<UserFunctionEntity>(TABLE_NAME)
    .where('id', userFunctionId)
    .update({ updated_at: db.raw('now()'), deleted_at: db.raw('now()') }, columns)