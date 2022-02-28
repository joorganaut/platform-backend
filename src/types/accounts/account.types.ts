import { BusinessObject, Entity } from "../../types";

export enum AccountStatus {
    open,
    closed,
    dormant
}

export interface Account extends BusinessObject {
    accountNumber: string,
    accountBalance: number,
    productId?: string,
    isGL?: boolean,
    minimumBalance?: number,
    hasOverDraft?: boolean,
    overDraftLimit?: number,
    overDraftInterestRate?: number,
    overDraftTenor?: number,
    depositInterestRate?: number,
    depositTenor?: number,
    status: AccountStatus,
    currencyId?: number,
    currency: string,

    name: string,
}

export interface AccountEntity extends Entity {
    account_number: string,
    account_balance: number,
    product_id?: string,
    is_gl?: boolean,
    minimum_balance?: number,
    has_overdraft?: boolean,
    overdraft_limit?: number,
    overdraft_interest_rate?: number,
    overdraft_tenor?: number,
    deposit_interest_rate?: number,
    deposit_tenor?: number,
    status: AccountStatus,
    currency_id?: number,
    currency: string,

    name: string,
}