import { Currency, CurrencyEntity } from '../../types/'

/*
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
*/

export const mapCurrencyFromCurrencyEntity = (entity: CurrencyEntity): Currency => {

    return {
        id: entity.id,
        code: entity.code,
        homeCurrencyId: entity.home_currency_id,
        exchangeRate: entity.exchange_rate,
        description: entity.description,
    }
}

export const mapCurrencyEntityFromCurrency = (currency: Currency): CurrencyEntity => {

    return {
        code: currency.code,
        home_currency_id: currency.homeCurrencyId,
        exchange_rate: currency.exchangeRate,
        description: currency.description
    }
}