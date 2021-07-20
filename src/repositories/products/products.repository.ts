import { db } from '../../server/db'
import { ProductEntity, PagingParams } from '../../types'

const TABLE_NAME = 'products'

const columns = [
    'id',
    'prefix',
    'is_gl_product',
    'service_type',
    'minimum_balance',
    'has_overdraft',
    'overdraft_limit',
    'overdraft_interest_rate',
    'overdraft_tenor',
    'deposit_interest_rate',
    'deposit_tenor',
    'institution_percentage',
    'customer_percentage',
    'income_account',
    'expense_account',
    'currency_id',
    'currency',
    'name'
]

export const fetchProducts = async (institutionCode: string, params?: PagingParams): Promise<ProductEntity[] | any> => {
    if (params) {
        const offSet = ((params.page as number < 1 ? 1 : params.page) - 1) * params.pageSize
        const [count] = await db<ProductEntity>(TABLE_NAME).count('id').whereNull('deleted_at').where('institution_code', institutionCode)
        params.totalCount = count['count'] as number
        const result = await db<ProductEntity>(TABLE_NAME).whereNull('deleted_at').where('institution_code', institutionCode).offset(offSet).limit(params.pageSize).select(columns).orderBy(params.sort, params.dir)
        params.data = result
        return params
    }
    return await db<ProductEntity>(TABLE_NAME).whereNull('deleted_at').where('institution_code', institutionCode).select(columns)
}

export const fetchProductById = async (ProductId: string, institutionCode: string): Promise<ProductEntity> => await db<ProductEntity>(TABLE_NAME).whereNull('deleted_at').where('id', ProductId).where('institution_code', institutionCode).first(columns)

export const fetchProductByName = async (name: string, institutionCode: string): Promise<ProductEntity> => await db<ProductEntity>(TABLE_NAME).whereNull('deleted_at').where('name', name).where('institution_code', institutionCode).first(columns)

export const createProduct = async (Product: ProductEntity): Promise<ProductEntity[]> => await db<ProductEntity>(TABLE_NAME).insert({ ...Product, updated_at: db.raw('now()'), created_at: db.raw('now()') }, columns)

export const updateProduct = async (ProductId: string, Product: ProductEntity, institutionCode: string): Promise<ProductEntity[]> => await db<ProductEntity>(TABLE_NAME)
    .where('id', ProductId)
    .where('institution_code', institutionCode)
    .whereNull('deleted_at')
    .update({ ...Product, updated_at: db.raw('now()') }, columns)

export const deleteProduct = async (ProductId: string, institutionCode: string): Promise<ProductEntity[]> => await db<ProductEntity>(TABLE_NAME)
    .where('id', ProductId)
    .where('institution_code', institutionCode)
    .update({ updated_at: db.raw('now()'), deleted_at: db.raw('now()') }, columns)