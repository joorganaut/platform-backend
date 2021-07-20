import { db } from '../../server/db'
import { TransactionEntity, PagingParams } from '../../types'

const TABLE_NAME = 'transactions'

const columns = [
    'id',
    'account',
    'amount',
    'narration',
    'transaction_ref',
    'trace_id',
    'source',
    'guid_ref',
    'type',


]

export const fetchTransactions = async (institutionCode: string, params?: PagingParams): Promise<TransactionEntity[] | any> => {
    if (params) {
        const offSet = ((params.page as number < 1 ? 1 : params.page) - 1) * params.pageSize
        const [count] = await db<TransactionEntity>(TABLE_NAME).count('id').whereNull('deleted_at').where('institution_code', institutionCode)
        params.totalCount = count['count'] as number
        const result = await db<TransactionEntity>(TABLE_NAME).whereNull('deleted_at').where('institution_code', institutionCode).offset(offSet).limit(params.pageSize).select(columns).orderBy(params.sort, params.dir)
        params.data = result
        return params
    }
    return await db<TransactionEntity>(TABLE_NAME).whereNull('deleted_at').where('institution_code', institutionCode).select(columns)
}

export const fetchTransactionById = async (TransactionId: string, institutionCode: string): Promise<TransactionEntity> => await db<TransactionEntity>(TABLE_NAME).whereNull('deleted_at').where('id', TransactionId).where('institution_code', institutionCode).first(columns)

export const fetchTransactionsByAccount = async (account: string, institutionCode: string): Promise<TransactionEntity[]> => await db<TransactionEntity>(TABLE_NAME).whereNull('deleted_at').where('account', account).where('institution_code', institutionCode)

export const createTransaction = async (Transaction: TransactionEntity): Promise<TransactionEntity[]> => await db<TransactionEntity>(TABLE_NAME).insert({ ...Transaction, updated_at: db.raw('now()'), created_at: db.raw('now()') }, columns)

export const updateTransaction = async (TransactionId: string, Transaction: TransactionEntity, institutionCode: string): Promise<TransactionEntity[]> => await db<TransactionEntity>(TABLE_NAME)
    .where('id', TransactionId)
    .where('institution_code', institutionCode)
    .whereNull('deleted_at')
    .update({ ...Transaction, updated_at: db.raw('now()') }, columns)

export const deleteTransaction = async (TransactionId: string, institutionCode: string): Promise<TransactionEntity[]> => await db<TransactionEntity>(TABLE_NAME)
    .where('id', TransactionId)
    .where('institution_code', institutionCode)
    .update({ updated_at: db.raw('now()'), deleted_at: db.raw('now()') }, columns)