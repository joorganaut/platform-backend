import * as Knex from "knex";


export async function up(knex: Knex): Promise<any> {
    await knex.schema.alterTable('projects', (t) => {
        t.jsonb('items')
        t.decimal('budget', 14, 2)
        t.string('currency')
        t.uuid('client_id').references('id').inTable('contacts')
    })
}


export async function down(knex: Knex): Promise<any> {
    await knex.schema.alterTable('projects', (t) => {
        t.dropColumn('items')
        t.dropColumn('budget')
        t.dropColumn('currency')
        t.dropColumn('client_id')
    })
}

