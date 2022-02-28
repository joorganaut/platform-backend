import { Account, AccountEntity } from '../../types/'

/*
export interface Account extends BusinessObject {
    accountNumber: string,
    accountBalance: number,
    productId: string,
    isGL: boolean,
    minimumBalance: number,
    hasOverDraft: boolean,
    overDraftLimit: number,
    overDraftInterestRate: number,
    overDraftTenor: number,
    depositInterestRate: number,
    depositTenor: number,
    status: AccountStatus,
    currencyId: number,
    currency: string,

    name: string,
}

export interface AccountEntity extends Entity {
    account_number: string,
    account_balance: number,
    product_id: string,
    is_gl: boolean,
    minimum_balance: number,
    has_overdraft: boolean,
    overdraft_limit: number,
    overdraft_interest_rate: number,
    overdraft_tenor: number,
    deposit_interest_rate: number,
    deposit_tenor: number,
    status: AccountStatus,
    currency_id: number,
    currency: string,

    name: string,
}
*/

export const mapAccountFromAccountEntity = (entity: AccountEntity): Account => {

    return {
        id: entity.id,
        accountNumber: entity.account_number,
        accountBalance: entity.account_balance,
        productId: entity.product_id,
        isGL: entity.is_gl,
        minimumBalance: entity.minimum_balance,
        hasOverDraft: entity.has_overdraft,
        overDraftLimit: entity.overdraft_limit,
        overDraftInterestRate: entity.overdraft_interest_rate,
        overDraftTenor: entity.overdraft_tenor,
        depositInterestRate: entity.deposit_interest_rate,
        depositTenor: entity.deposit_tenor,
        status: entity.status,
        currencyId: entity.currency_id,
        currency: entity.currency,

        name: entity.name,
        institutionCode: entity.institution_code
    }
}

export const mapAccountEntityFromAccount = (account: Account, institutionCode: string): AccountEntity => {

    return {
        account_number: account.accountNumber,
        account_balance: account.accountBalance,
        product_id: account.productId,
        is_gl: account.isGL,
        minimum_balance: account.minimumBalance,
        has_overdraft: account.hasOverDraft,
        overdraft_limit: account.overDraftLimit,
        overdraft_interest_rate: account.overDraftInterestRate,
        overdraft_tenor: account.overDraftTenor,
        deposit_interest_rate: account.depositInterestRate,
        deposit_tenor: account.depositTenor,
        status: account.status,
        currency_id: account.currencyId,
        currency: account.currency,

        name: account.name,

        institution_code: institutionCode
    }
}