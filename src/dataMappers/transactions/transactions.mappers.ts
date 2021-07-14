import { Transaction, TransactionEntity } from '../../types'

/*
export interface Transaction extends BusinessObject {
    account: string,
    amount: number,
    narration: string,
    transactionRef: string,
    traceID: string,
    source: string,
    guidRef: string,
    type: TransactionType,
}

export interface Transaction extends Entity {
    account: string,
    amount: number,
    narration: string,
    transaction_ref: string,
    trace_id: string,
    source: string,
    guid_ref: string,
    type: TransactionType,
}
*/

export const mapTransactionFromTransactionEntity = (entity: TransactionEntity): Transaction => {

    return {
        id: entity.id,
        account: entity.account,
        amount: entity.amount,
        narration: entity.narration,
        transactionRef: entity.transaction_ref,
        traceID: entity.trace_id,
        source: entity.source,
        guidRef: entity.guid_ref,
        type: entity.type,
        institutionCode: entity.institution_code

    }
}

export const mapTransactionEntityFromTransaction = (transaction: Transaction): TransactionEntity => {

    return {
        account: transaction.account,
        amount: transaction.amount,
        narration: transaction.narration,
        transaction_ref: transaction.transactionRef,
        trace_id: transaction.traceID,
        source: transaction.source,
        guid_ref: transaction.guidRef,
        type: transaction.type,
        institution_code: transaction.institutionCode
    }
}