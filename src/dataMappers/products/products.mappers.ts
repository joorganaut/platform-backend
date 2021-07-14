import { Product, ProductEntity } from '../../types'

/*
export interface Product extends BusinessObject {
    prefix: string,
    isGLProduct: boolean,
    serviceType: string,
    minimumBalance: number,
    hasOverDraft: boolean,
    overDraftLimit: number,
    overDraftInterestRate: number,
    overDraftTenor: number,
    depositInterestRate: number,
    depositTenor: number,
    institutionPercentage: number,
    customerPercentage: number,
    incomeAccount: string,
    expenseAccount: string,
    currencyId: string,
    currency: string,
    name: string
}

export interface ProductEntity extends Entity {
    prefix: string,
    is_gl_product: boolean,
    service_type: string,
    minimum_balance: number,
    has_overdraft: boolean,
    overdraft_limit: number,
    overdraft_interest_rate: number,
    overdraft_tenor: number,
    deposit_interest_rate: number,
    deposit_tenor: number,
    institution_percentage: number,
    customer_percentage: number,
    income_account: string,
    expense_account: string,
    currency_id: string,
    currency: string,
    name: string
}
*/

export const mapProductFromProductEntity = (entity: ProductEntity): Product => {

    return {
        id: entity.id,
        prefix: entity.prefix,
        isGLProduct: entity.is_gl_product,
        serviceType: entity.service_type,
        minimumBalance: entity.minimum_balance,
        hasOverDraft: entity.has_overdraft,
        overDraftLimit: entity.overdraft_limit,
        overDraftInterestRate: entity.overdraft_interest_rate,
        overDraftTenor: entity.overdraft_tenor,
        depositInterestRate: entity.deposit_interest_rate,
        depositTenor: entity.deposit_tenor,
        institutionPercentage: entity.institution_percentage,
        customerPercentage: entity.customer_percentage,
        incomeAccount: entity.income_account,
        expenseAccount: entity.expense_account,
        currencyId: entity.currency_id,
        currency: entity.currency,
        name: entity.name,
        institutionCode: entity.institution_code

    }
}

export const mapProductEntityFromProduct = (product: Product): ProductEntity => {

    return {
        name: product.name,
        prefix: product.prefix,
        is_gl_product: product.isGLProduct,
        service_type: product.serviceType,
        minimum_balance: product.minimumBalance,
        has_overdraft: product.hasOverDraft,
        overdraft_limit: product.overDraftLimit,
        overdraft_interest_rate: product.overDraftInterestRate,
        overdraft_tenor: product.overDraftTenor,
        deposit_interest_rate: product.depositInterestRate,
        deposit_tenor: product.depositTenor,
        institution_percentage: product.institutionPercentage,
        customer_percentage: product.customerPercentage,
        income_account: product.incomeAccount,
        expense_account: product.expenseAccount,
        currency_id: product.currencyId,
        currency: product.currency,
        institution_code: product.institutionCode
    }
}