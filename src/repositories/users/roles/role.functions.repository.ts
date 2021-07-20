import { db } from '../../../server/db'
import { RoleFunctionEntity, PagingParams } from '../../../types'

const TABLE_NAME = 'user_roles'

const columns = [
    'id',
    'role_id',
    'function_id',
    'function_name'
]

export const fetchRoleFunctions = async (institutionCode: string, params?: PagingParams): Promise<RoleFunctionEntity[] | any> => {
    if (params) {
        const offSet = ((params.page as number < 1 ? 1 : params.page) - 1) * params.pageSize
        const [count] = await db<RoleFunctionEntity>(TABLE_NAME).count('id').whereNull('deleted_at').where('institution_code', institutionCode)
        params.totalCount = count['count'] as number
        const result = await db<RoleFunctionEntity>(TABLE_NAME).whereNull('deleted_at').where('institution_code', institutionCode).offset(offSet).limit(params.pageSize).select(columns).orderBy(params.sort, params.dir)
        params.data = result
        return params
    }
    return await db<RoleFunctionEntity>(TABLE_NAME).whereNull('deleted_at').where('institution_code', institutionCode).select(columns)
}

export const fetchRoleFunctionById = async (roleFunctionId: string, institutionCode: string): Promise<RoleFunctionEntity> => await db<RoleFunctionEntity>(TABLE_NAME).whereNull('deleted_at').where('id', roleFunctionId).where('institution_code', institutionCode).first(columns)

export const fetchRoleFunctionByRoleId = async (roleId: string, institutionCode: string): Promise<RoleFunctionEntity[]> => await db<RoleFunctionEntity>(TABLE_NAME).whereNull('deleted_at').where('role_id', roleId).where('institution_code', institutionCode)

export const createRoleFunction = async (roleFunction: RoleFunctionEntity): Promise<RoleFunctionEntity[]> => await db<RoleFunctionEntity>(TABLE_NAME).insert({ ...roleFunction, updated_at: db.raw('now()'), created_at: db.raw('now()') }, columns)

export const updateRoleFunction = async (roleFunctionId: string, roleFunction: RoleFunctionEntity, institutionCode: string): Promise<RoleFunctionEntity[]> => await db<RoleFunctionEntity>(TABLE_NAME)
    .where('id', roleFunctionId)
    .where('institution_code', institutionCode)
    .whereNull('deleted_at')
    .update({ ...roleFunction, updated_at: db.raw('now()') }, columns)

export const deleteRoleFunction = async (roleFunctionId: string, institutionCode: string): Promise<RoleFunctionEntity[]> => await db<RoleFunctionEntity>(TABLE_NAME)
    .where('id', roleFunctionId)
    .where('institution_code', institutionCode)
    .update({ updated_at: db.raw('now()'), deleted_at: db.raw('now()') }, columns)