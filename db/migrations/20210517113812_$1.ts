import * as Knex from "knex";


export async function up(knex: Knex): Promise<any> {
    await knex.schema.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";')
    await knex.schema.createTable('application_meta_data', (t) => {
        t.uuid('id')
            .notNullable()
            .primary()
            .unique()
            .defaultTo(knex.raw('uuid_generate_v4()'))

        t.string('name')
            .notNullable()
            .unique()

        t.jsonb('value').nullable()
        t.string('type').nullable()
        t.boolean('enabled').nullable()
        t.string('expiry_date').nullable()

        t.timestamp('created_at').defaultTo(knex.fn.now())
        t.timestamp('updated_at').defaultTo(knex.fn.now())
        t.timestamp('deleted_at').defaultTo(null)
    })
}


export async function down(knex: Knex): Promise<any> {
    await knex.schema.dropTable('application_meta_data')
}

