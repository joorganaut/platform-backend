import { db } from '../../server/db'
import { ApplicationMetaDataEntity, PagingParams } from '../../types'

const TABLE_NAME = 'application_meta_data'

const columns = [
    'id',
    'name',
    'value',
    'enabled',
    'expiry_date'
]

export const fetchAllApplicationMetaData = async (params?: PagingParams): Promise<ApplicationMetaDataEntity[] | any> => {
    if (params) {
        const offSet = ((params.page < 1 ? 1 : params.page) - 1) * params.pageSize
        const [count] = await db<ApplicationMetaDataEntity>(TABLE_NAME).count('id')
        params.totalCount = count['count'] as number
        const result = await db<ApplicationMetaDataEntity>(TABLE_NAME).whereNull('deleted_at').offset(offSet).limit(params.pageSize).select(columns).orderBy(params.sort, params.dir)
        params.data = result
        return params
    }
    return await db<ApplicationMetaDataEntity>(TABLE_NAME).whereNull('deleted_at').select(columns)
}

export const fetchApplicationMetaDataById = async (applicationMetaDataId: string): Promise<ApplicationMetaDataEntity> => await db<ApplicationMetaDataEntity>(TABLE_NAME).whereNull('deleted_at').where('id', applicationMetaDataId).first(columns)

export const fetchApplicationMetaDataByName = async (name: string): Promise<ApplicationMetaDataEntity> => await db<ApplicationMetaDataEntity>(TABLE_NAME).whereNull('deleted_at').where('name', name).first(columns)

export const createApplicationMetaData = async (applicationMetaData: ApplicationMetaDataEntity): Promise<ApplicationMetaDataEntity[]> => await db<ApplicationMetaDataEntity>(TABLE_NAME).insert({ ...applicationMetaData, updated_at: db.raw('now()'), created_at: db.raw('now()') }, columns)

export const updateUser = async (applicationMetaDataId: string, applicationMetaData: ApplicationMetaDataEntity): Promise<ApplicationMetaDataEntity[]> => await db<ApplicationMetaDataEntity>(TABLE_NAME)
    .where('id', applicationMetaDataId)
    .whereNull('deleted_at')
    .update({ ...applicationMetaData, updated_at: db.raw('now()') }, columns)

export const deleteUser = async (applicationMetaDataId: string): Promise<ApplicationMetaDataEntity[]> => await db<ApplicationMetaDataEntity>(TABLE_NAME)
    .where('id', applicationMetaDataId)
    .update({ updated_at: db.raw('now()'), deleted_at: db.raw('now()') }, columns)