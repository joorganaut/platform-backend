import * as Knex from "knex";


export async function up(knex: Knex): Promise<any> {
    await knex.schema.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";')
    await knex.schema.createTable('preferences', (t) => {
        t.uuid('id')
            .notNullable()
            .primary()
            .defaultTo(knex.raw('uuid_generate_v4()'))

        t.uuid('profile_id')
            .references('id')
            .inTable('profiles')

        t.boolean('instant_notifications_email')
        t.boolean('daily_summary_email')
        t.boolean('events_email')

        t.timestamp('created_at').defaultTo(knex.fn.now())
        t.timestamp('updated_at').defaultTo(knex.fn.now())
        t.timestamp('deleted_at').defaultTo(null)
    })
}


export async function down(knex: Knex): Promise<any> {
    await knex.schema.dropTable('preferences')
}

