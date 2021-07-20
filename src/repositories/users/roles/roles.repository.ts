import { db } from '../../../server/db'
import { RoleEntity, PagingParams } from '../../../types'

const TABLE_NAME = 'roles'

const columns = [
    'id',
    'name',
    'is_transactable',
    'transaction_amount'
]

export const fetchRoles = async (institutionCode: string, params?: PagingParams): Promise<RoleEntity[] | any> => {
    if (params) {
        const offSet = ((params.page as number < 1 ? 1 : params.page) - 1) * params.pageSize
        const [count] = await db<RoleEntity>(TABLE_NAME).count('id').whereNull('deleted_at').where('institution_code', institutionCode)
        params.totalCount = count['count'] as number
        const result = await db<RoleEntity>(TABLE_NAME).whereNull('deleted_at').where('institution_code', institutionCode).offset(offSet).limit(params.pageSize).select(columns).orderBy(params.sort, params.dir)
        params.data = result
        return params
    }
    return await db<RoleEntity>(TABLE_NAME).whereNull('deleted_at').where('institution_code', institutionCode).select(columns)
}

export const fetchRoleById = async (roleId: string, institutionCode: string): Promise<RoleEntity> => await db<RoleEntity>(TABLE_NAME).whereNull('deleted_at').where('id', roleId).where('institution_code', institutionCode).first(columns)

export const fetchRoleByName = async (name: string, institutionCode: string): Promise<RoleEntity> => await db<RoleEntity>(TABLE_NAME).whereNull('deleted_at').where('name', name).where('institution_code', institutionCode).first(columns)

export const createRole = async (role: RoleEntity): Promise<RoleEntity[]> => await db<RoleEntity>(TABLE_NAME).insert({ ...role, updated_at: db.raw('now()'), created_at: db.raw('now()') }, columns)

export const updateRole = async (roleId: string, role: RoleEntity, institutionCode: string): Promise<RoleEntity[]> => await db<RoleEntity>(TABLE_NAME)
    .where('id', roleId)
    .where('institution_code', institutionCode)
    .whereNull('deleted_at')
    .update({ ...role, updated_at: db.raw('now()') }, columns)

export const deleteRole = async (roleId: string, institutionCode: string): Promise<RoleEntity[]> => await db<RoleEntity>(TABLE_NAME)
    .where('id', roleId)
    .where('institution_code', institutionCode)
    .update({ updated_at: db.raw('now()'), deleted_at: db.raw('now()') }, columns)