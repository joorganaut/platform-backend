import * as Knex from "knex";

/*
export interface CurrencyEntity extends Entity {
    code: string,
    home_currency_id: string,
    exchange_rate: number,
    description: string
}
*/
export async function up(knex: Knex): Promise<any> {
    await knex.schema.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";')
    await knex.schema.createTable('currencies', (t) => {
        t.uuid('id')
            .notNullable()
            .primary()
            .unique()
            .defaultTo(knex.raw('uuid_generate_v4()'))
        t.string('code').unique()
        t.string('home_currency_id')
        t.decimal('exchange_rate')
        t.string('description')

        t.timestamp('created_at').defaultTo(knex.fn.now())
        t.timestamp('updated_at').defaultTo(knex.fn.now())
        t.timestamp('deleted_at').defaultTo(null)
    })
}


export async function down(knex: Knex): Promise<any> {
    await knex.schema.dropTable('currencies')
}

