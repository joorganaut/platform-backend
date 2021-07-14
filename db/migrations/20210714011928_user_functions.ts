import * as Knex from "knex";

/*
export interface UserFunctionEntity extends Entity {
    name: string
    action: string
    is_enabled: boolean
}
*/

export async function up(knex: Knex): Promise<any> {
    await knex.schema.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";')
    await knex.schema.createTable('user_functions', (t) => {
        t.uuid('id')
            .notNullable()
            .primary()
            .unique()
            .defaultTo(knex.raw('uuid_generate_v4()'))
        t.string('name').unique()
        t.string('action')
        t.boolean('is_enabled')
        t.uuid('institution_code').references('id').inTable('institutions')
            .nullable()
        t.timestamp('created_at').defaultTo(knex.fn.now())
        t.timestamp('updated_at').defaultTo(knex.fn.now())
        t.timestamp('deleted_at').defaultTo(null)
    })
}


export async function down(knex: Knex): Promise<any> {
    await knex.schema.dropTable('user_functions')
}

