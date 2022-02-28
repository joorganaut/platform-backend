import * as Knex from "knex";

/*
export enum AccountStatus {
    open,
    closed,
    dormant
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

export async function up(knex: Knex): Promise<any> {
    await knex.schema.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";')
    await knex.schema.createTable('accounts', (t) => {
        t.uuid('id')
            .notNullable()
            .primary()
            .unique()
            .defaultTo(knex.raw('uuid_generate_v4()'))
        t.string('account_number')
        t.decimal('account_balance')
        t.uuid('product_id').references('id').inTable('products').nullable()
        t.boolean('is_gl')
        t.decimal('minimum_balance')
        t.boolean('has_overdraft')
        t.decimal('overdraft_limit')
        t.decimal('overdraft_interest_rate')
        t.integer('overdraft_tenor')
        t.decimal('deposit_interest_rate')
        t.integer('deposit_tenor')
        t.integer('status')
        t.uuid('currency_id').references('id').inTable('currencies').nullable()

        t.string('currency')
        t.string('name')
        t.uuid('institution_code').references('id').inTable('institutions')
            .notNullable()
        t.timestamp('created_at').defaultTo(knex.fn.now())
        t.timestamp('updated_at').defaultTo(knex.fn.now())
        t.timestamp('deleted_at').defaultTo(null)
    })
}


export async function down(knex: Knex): Promise<any> {
    await knex.schema.dropTable('accounts')
}

