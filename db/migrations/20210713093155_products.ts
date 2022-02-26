import * as Knex from "knex";

/*
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
export async function up(knex: Knex): Promise<any> {
    await knex.schema.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";')
    await knex.schema.createTable('products', (t) => {
        t.uuid('id')
            .notNullable()
            .primary()
            .unique()
            .defaultTo(knex.raw('uuid_generate_v4()'))
        t.string('prefix')
        t.boolean('is_gl_product')
        t.string('service_type')
        t.decimal('minimum_balance', 14, 2)
        t.boolean('has_overdraft')
        t.decimal('overdraft_limit', 14, 2)
        t.decimal('overdraft_interest_rate', 14, 2)
        t.integer('overdraft_tenor')
        t.decimal('deposit_interest_rate', 14, 2)
        t.integer('deposit_tenor')
        t.decimal('institution_percentage', 14, 2)
        t.decimal('customer_percentage', 14, 2)
        t.uuid('income_account').notNullable()
        t.uuid('expense_account').notNullable()
        t.uuid('currency_id').references('id').inTable('currencies').notNullable()
        t.string('currency').references('code').inTable('currencies').notNullable()
        t.string('name')


        t.timestamp('created_at').defaultTo(knex.fn.now())
        t.timestamp('updated_at').defaultTo(knex.fn.now())
        t.timestamp('deleted_at').defaultTo(null)
    })
}


export async function down(knex: Knex): Promise<any> {
    await knex.schema.dropTable('products')
}

