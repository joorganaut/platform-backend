import { BusinessObject, Entity } from "../../types/admin/default.types";


export interface Currency extends BusinessObject {
    code: string,
    homeCurrencyId: string,
    exchangeRate: number,
    description: string
}

export interface CurrencyEntity extends Entity {
    code: string,
    home_currency_id: string,
    exchange_rate: number,
    description: string
}