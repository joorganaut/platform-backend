import * as Knex from "knex";


export async function up(knex: Knex): Promise<any> {
    await knex.schema.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";')
    await knex.schema.alterTable('partners', (t) => {
        t.string('founded')
        t.string('company_size')
    })
}


export async function down(knex: Knex): Promise<any> {
    await knex.schema.alterTable('partners', (t) => {
        t.dropColumns('founded', 'company_size')
    })
}

