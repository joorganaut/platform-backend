import * as Knex from "knex";


export async function up(knex: Knex): Promise<any> {
    await knex.schema.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";')
    await knex.schema.createTable('profiles', (t) => {
        t.uuid('id')
            .notNullable()
            .primary()
            .unique()
            .defaultTo(knex.raw('uuid_generate_v4()'))

        t.uuid('user_id')
            .references('id')
            .inTable('users')

        t.string('location')
        t.string('bio')
        t.string('avatar')
        t.string('title')
        t.string('industry')
        t.string('handler')
        
        t.timestamp('created_at').defaultTo(knex.fn.now())
        t.timestamp('updated_at').defaultTo(knex.fn.now())
        t.timestamp('deleted_at').defaultTo(null)
    })
}


export async function down(knex: Knex): Promise<any> {

    await knex.schema.dropTable('profiles')
}

