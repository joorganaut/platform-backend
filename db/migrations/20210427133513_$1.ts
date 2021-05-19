import * as Knex from "knex"


export async function up(knex: Knex): Promise<any> {
    await knex.schema.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";')
    await knex.schema.alterTable('users', (t) => {
        t.string('verification_link').nullable()
    })
}


export async function down(knex: Knex): Promise<any> {
    await knex.schema.alterTable('users', (t) => {
        t.dropColumn('verification_link')
    })
}

