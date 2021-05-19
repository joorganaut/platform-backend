import * as Knex from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";')
    await knex.schema.alterTable('users', (t) => {
        t.jsonb('onboarding_questions')
    })
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.alterTable('users', (t) => {
        t.dropColumn('onboarding_questions')
    })
}

