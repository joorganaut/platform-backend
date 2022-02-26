import * as Knex from "knex";

/*
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
*/
export async function up(knex: Knex): Promise<any> {
    await knex.schema.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";')
    await knex.schema.createTable('transactions', (t) => {
        /**Parent Properties start */
        t.uuid('id')
            .notNullable()
            .primary()
            .unique()
            .defaultTo(knex.raw('uuid_generate_v4()'))
        t.uuid('institution_code').references('id').inTable('institutions')
            .notNullable()
        t.timestamp('created_at').defaultTo(knex.fn.now())
        t.timestamp('updated_at').defaultTo(knex.fn.now())
        t.timestamp('deleted_at').defaultTo(null)
        /**Parent Properties end */

        t.uuid('account').references('id').inTable('accounts').notNullable()
        t.decimal('amount', 14, 2)
        t.string('narration')
        t.string('transaction_ref')
        t.string('trace_id')
        t.string('source')
        t.uuid('guid_ref').defaultTo(knex.raw('uuid_generate_v4()')).unique()
        t.integer('type')
    })

}


export async function down(knex: Knex): Promise<any> {
    await knex.schema.dropTable('transactions')
}

