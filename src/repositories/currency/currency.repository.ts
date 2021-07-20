import { db } from '../../server/db'
import { CurrencyEntity, PagingParams } from '../../types'

const TABLE_NAME = 'currencies'

const columns = [
    'id',
    'code',
    'home_currency_id',
    'exchange_rate',
    'description'
]

export const fetchCurrencies = async (params?: PagingParams): Promise<CurrencyEntity[] | any> => {
    if (params) {
        const offSet = ((params.page as number < 1 ? 1 : params.page) - 1) * params.pageSize
        const [count] = await db<CurrencyEntity>(TABLE_NAME).count('id').whereNull('deleted_at')
        params.totalCount = count['count'] as number
        const result = await db<CurrencyEntity>(TABLE_NAME).whereNull('deleted_at').offset(offSet).limit(params.pageSize).select(columns).orderBy(params.sort, params.dir)
        params.data = result
        return params
    }
    return await db<CurrencyEntity>(TABLE_NAME).whereNull('deleted_at').select(columns)
}

export const fetchCurrencyById = async (currencyId: string): Promise<CurrencyEntity> => await db<CurrencyEntity>(TABLE_NAME).whereNull('deleted_at').where('id', currencyId).first(columns)

export const fetchCurrencyByCode = async (code: string): Promise<CurrencyEntity> => await db<CurrencyEntity>(TABLE_NAME).whereNull('deleted_at').where('code', code).first(columns)

export const createCurrency = async (currency: CurrencyEntity): Promise<CurrencyEntity[]> => await db<CurrencyEntity>(TABLE_NAME).insert({ ...currency, updated_at: db.raw('now()'), created_at: db.raw('now()') }, columns)

export const updateCurrency = async (currencyId: string, currency: CurrencyEntity): Promise<CurrencyEntity[]> => await db<CurrencyEntity>(TABLE_NAME)
    .where('id', currencyId)
    .whereNull('deleted_at')
    .update({ ...currency, updated_at: db.raw('now()') }, columns)

export const deleteCurrency = async (currencyId: string): Promise<CurrencyEntity[]> => await db<CurrencyEntity>(TABLE_NAME)
    .where('id', currencyId)
    .update({ updated_at: db.raw('now()'), deleted_at: db.raw('now()') }, columns)