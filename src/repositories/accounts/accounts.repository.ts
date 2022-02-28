import { db } from '../../server/db'
import { AccountEntity, PagingParams } from '../../types'

const TABLE_NAME = 'accounts'

const columns = [
    'id',
    'account_number',
    'account_balance',
    'product_id',
    'is_gl',
    'minimum_balance',
    'has_overdraft',
    'overdraft_limit',
    'overdraft_interest_rate',
    'overdraft_tenor',
    'deposit_interest_rate',
    'deposit_tenor',
    'status',
    'currency_id',
    'currency',
    'name',
]

export const fetchAccounts = async (institutionCode: string, params?: PagingParams): Promise<AccountEntity[] | any> => {
    if (params) {
        const offSet = ((params.page as number < 1 ? 1 : params.page) - 1) * params.pageSize
        const [count] = await db<AccountEntity>(TABLE_NAME).count('id').whereNull('deleted_at').where('institution_code', institutionCode)
        params.totalCount = count['count'] as number
        const result = await db<AccountEntity>(TABLE_NAME).whereNull('deleted_at').where('institution_code', institutionCode).offset(offSet).limit(params.pageSize).select(columns).orderBy(params.sort, params.dir)
        params.data = result
        return params
    }
    return await db<AccountEntity>(TABLE_NAME).whereNull('deleted_at').where('institution_code', institutionCode).select(columns)
}

export const fetchAccountById = async (accountId: string, institutionCode: string): Promise<AccountEntity> => await db<AccountEntity>(TABLE_NAME).whereNull('deleted_at').where('id', accountId).where('institution_code', institutionCode).first(columns)

export const fetchAccountByName = async (name: string, institutionCode: string): Promise<AccountEntity> => await db<AccountEntity>(TABLE_NAME).whereNull('deleted_at').where('name', name).where('institution_code', institutionCode).first(columns)

export const fetchAccountByNumber = async (number: string, institutionCode: string): Promise<AccountEntity> => await db<AccountEntity>(TABLE_NAME).whereNull('deleted_at').where('account_number', number).where('institution_code', institutionCode).first(columns)

export const createAccount = async (account: AccountEntity): Promise<AccountEntity[]> => await db<AccountEntity>(TABLE_NAME).insert({ ...account, updated_at: db.raw('now()'), created_at: db.raw('now()') }, columns)

export const updateAccount = async (accountId: string, account: AccountEntity, institutionCode: string): Promise<AccountEntity[]> => await db<AccountEntity>(TABLE_NAME)
    .where('id', accountId)
    .where('institution_code', institutionCode)
    .whereNull('deleted_at')
    .update({ ...account, updated_at: db.raw('now()') }, columns)

export const deleteAccount = async (accountId: string, institutionCode: string): Promise<AccountEntity[]> => await db<AccountEntity>(TABLE_NAME)
    .where('id', accountId)
    .where('institution_code', institutionCode)
    .update({ updated_at: db.raw('now()'), deleted_at: db.raw('now()') }, columns)

export const createBulkAccounts = async (accounts: AccountEntity[]): Promise<AccountEntity[]> => await db<AccountEntity[]>(TABLE_NAME).insert(accounts)