import * as Knex from "knex";

/*
user_id: string
    role_id: string
    role_name: string
    is_admin: boolean,
    username: string
*/
export async function up(knex: Knex): Promise<any> {
    await knex.schema.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";')
    await knex.schema.createTable('user_roles', (t) => {
        t.uuid('id')
            .notNullable()
            .primary()
            .unique()
            .defaultTo(knex.raw('uuid_generate_v4()'))
        t.uuid('role_id').notNullable().references('id').inTable('roles')
        t.string('role_name').notNullable().references('name').inTable('roles')
        t.boolean('is_admin')
        t.string('username').notNullable().references('username').inTable('users')
        t.uuid('user_id').notNullable().references('id').inTable('users')
        t.uuid('institution_code').references('id').inTable('institutions')
            .nullable()
        t.timestamp('created_at').defaultTo(knex.fn.now())
        t.timestamp('updated_at').defaultTo(knex.fn.now())
        t.timestamp('deleted_at').defaultTo(null)
    })
}


export async function down(knex: Knex): Promise<any> {
    await knex.schema.dropTable('user_roles')
}

