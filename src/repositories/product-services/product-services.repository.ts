import { db } from '../../server/db'
import { ProductServiceEntity, PagingParams } from '../../types'

const TABLE_NAME = 'product-services'

const columns = [
    'id',
    'name',
    'description',
    'cost',
    'taxable',
    'image',
    'active',
    'category',
    'currency',
    'tags'
]

export const fetchProductServices = async (institutionCode: string, params?: PagingParams): Promise<ProductServiceEntity[] | any> => {
    if (params) {
        const offSet = ((params.page < 1 ? 1 : params.page) - 1) * params.pageSize
        const [count] = await db<ProductServiceEntity>(TABLE_NAME).count('id').whereNull('deleted_at').where('institution_code', institutionCode)
        params.totalCount = count['count'] as number
        const result = await db<ProductServiceEntity>(TABLE_NAME).whereNull('deleted_at').where('institution_code', institutionCode).offset(offSet).limit(params.pageSize).select(columns).orderBy(params.sort, params.dir)
        params.data = result
        return params
    }
    return await db<ProductServiceEntity>(TABLE_NAME).whereNull('deleted_at').where('institution_code', institutionCode).select(columns)
}

export const fetchProductServiceById = async (ProductServiceId: string, institutionCode: string): Promise<ProductServiceEntity> => await db<ProductServiceEntity>(TABLE_NAME).whereNull('deleted_at').where('id', ProductServiceId).where('institution_code', institutionCode).first(columns)

export const fetchProductServiceByName = async (name: string, institutionCode: string): Promise<ProductServiceEntity> => await db<ProductServiceEntity>(TABLE_NAME).whereNull('deleted_at').where('name', name).where('institution_code', institutionCode).first(columns)

export const createProductService = async (ProductService: ProductServiceEntity): Promise<ProductServiceEntity[]> => await db<ProductServiceEntity>(TABLE_NAME).insert({ ...ProductService, updated_at: db.raw('now()'), created_at: db.raw('now()') }, columns)

export const updateProductService = async (ProductServiceId: string, ProductService: ProductServiceEntity, institutionCode: string): Promise<ProductServiceEntity[]> => await db<ProductServiceEntity>(TABLE_NAME)
    .where('id', ProductServiceId)
    .where('institution_code', institutionCode)
    .whereNull('deleted_at')
    .update({ ...ProductService, updated_at: db.raw('now()') }, columns)

export const deleteProductService = async (ProductServiceId: string, institutionCode: string): Promise<ProductServiceEntity[]> => await db<ProductServiceEntity>(TABLE_NAME)
    .where('id', ProductServiceId)
    .where('institution_code', institutionCode)
    .update({ updated_at: db.raw('now()'), deleted_at: db.raw('now()') }, columns)