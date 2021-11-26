import * as Knex from "knex";


export async function up(knex: Knex): Promise<any> {
    await knex.schema.alterTable('contacts', (t) => {
        t.text('image')
    })
}


export async function down(knex: Knex): Promise<any> {
    await knex.schema.alterTable('contacts', (t) => {
        t.dropColumn('image')
    })
}

