import * as Knex from "knex";

/*
role_id: string
    function_id: string
    function_name: string
*/

export async function up(knex: Knex): Promise<any> {
    await knex.schema.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";')
    await knex.schema.createTable('role_functions', (t) => {
        t.uuid('id')
            .notNullable()
            .primary()
            .unique()
            .defaultTo(knex.raw('uuid_generate_v4()'))
        t.uuid('role_id').notNullable().references('id').inTable('roles')
        t.uuid('function_id').notNullable().references('id').inTable('user_functions')
        t.string('function_name').notNullable().references('name').inTable('user_functions')
        t.uuid('institution_code').references('id').inTable('institutions')
            .notNullable()
        t.timestamp('created_at').defaultTo(knex.fn.now())
        t.timestamp('updated_at').defaultTo(knex.fn.now())
        t.timestamp('deleted_at').defaultTo(null)
    })
}


export async function down(knex: Knex): Promise<any> {
    await knex.schema.dropTable('role_functions')
}

