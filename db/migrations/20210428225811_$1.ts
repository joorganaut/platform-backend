import * as Knex from "knex";


export async function up(knex: Knex): Promise<any> {
    await knex.schema.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";')
    await knex.schema.alterTable('users', (t) => {
        t.string('sso_type').nullable()
    })
}


export async function down(knex: Knex): Promise<any> {
    await knex.schema.alterTable('users', (t) => {
        t.dropColumn('sso_type')
    })
}

