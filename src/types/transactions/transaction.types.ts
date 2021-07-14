import { BusinessObject, Entity } from "../../types/admin/default.types";


export enum TransactionType {
    debit,
    credit,
    lien
}

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

export interface TransactionEntity extends Entity {
    account: string,
    amount: number,
    narration: string,
    transaction_ref: string,
    trace_id: string,
    source: string,
    guid_ref: string,
    type: TransactionType,
}