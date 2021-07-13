import { db } from '../../server/db'
import { InstitutionEntity, PagingParams } from '../../types'

const TABLE_NAME = 'institutions'

const columns = [
    'name',
    'logo',
    'color',
    'background_color',
    'website',
    'email',
    'id'
]

export const fetchInstitutions = async (params?: PagingParams): Promise<InstitutionEntity[] | any> => {
    if (params) {
        const offSet = ((params.page as number < 1 ? 1 : params.page) - 1) * params.pageSize
        const [count] = await db<InstitutionEntity>(TABLE_NAME).whereNull('deleted_at').count('id')
        params.totalCount = 0//count['count'] as number
        const result = await db<InstitutionEntity>(TABLE_NAME).whereNull('deleted_at').offset(offSet).limit(params.pageSize).select(columns).orderBy(params.sort, params.dir)
        params.data = result
        return params
    }
    return await db<InstitutionEntity>(TABLE_NAME).whereNull('deleted_at').select(columns)
}

export const fetchInstitutionById = async (InstitutionId: string): Promise<InstitutionEntity> => await db<InstitutionEntity>(TABLE_NAME).whereNull('deleted_at').where('id', InstitutionId).first(columns)

export const fetchInstitutionByEmail = async (email: string): Promise<InstitutionEntity> => await db<InstitutionEntity>(TABLE_NAME).whereNull('deleted_at').where('name', email).first(columns)

export const createInstitution = async (Institution: InstitutionEntity): Promise<InstitutionEntity[]> => await db<InstitutionEntity>(TABLE_NAME).insert({ ...Institution, updated_at: db.raw('now()'), created_at: db.raw('now()') }, columns)

export const updateInstitution = async (InstitutionId: string, Institution: InstitutionEntity): Promise<InstitutionEntity[]> => await db<InstitutionEntity>(TABLE_NAME)
    .where('id', InstitutionId)
    .whereNull('deleted_at')
    .update({ ...Institution, updated_at: db.raw('now()') }, columns)

export const deleteInstitution = async (InstitutionId: string): Promise<InstitutionEntity[]> => await db<InstitutionEntity>(TABLE_NAME)
    .where('id', InstitutionId)
    .update({ updated_at: db.raw('now()'), deleted_at: db.raw('now()') }, columns)