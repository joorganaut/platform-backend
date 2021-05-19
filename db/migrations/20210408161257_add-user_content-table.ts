import * as Knex from "knex";


export async function up(knex: Knex): Promise<any> {
    await knex.schema.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";')
    await knex.schema.createTable('user_contents', (t) => {
        t.uuid('id')
            .primary()
            .notNullable()
            .defaultTo(knex.raw('uuid_generate_v4()'))

        t.uuid('content_id')
            .references('id')
            .inTable('contents')

        t.uuid('profile_id')
            .references('id')
            .inTable('profiles')

        t.timestamp('created_at').defaultTo(knex.fn.now())
        t.timestamp('updated_at').defaultTo(knex.fn.now())
        t.timestamp('deleted_at').defaultTo(null)
    })
}


export async function down(knex: Knex): Promise<any> {
    await knex.schema.dropTable('user_contents')
}

