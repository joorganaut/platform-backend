import { BusinessObject, Entity } from "../../types/admin/default.types";


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