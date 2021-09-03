import * as Knex from "knex";

/*
export interface ContactEntity extends Entity {
    name: string
    business_name: string
    email: string
    phone: string
    address: string
    'currency',
    'tax_type',
    'short_name',
    'title',
    'work_phone',
    'type'
}
*/

export async function up(knex: Knex): Promise<any> {
    await knex.schema.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";')
    await knex.schema.createTable('contacts', (t) => {
        t.uuid('id')
            .notNullable()
            .primary()
            .unique()
            .defaultTo(knex.raw('uuid_generate_v4()'))
        t.string('name')
        t.string('business_name')
        t.string('email').notNullable()
        t.string('phone')
        t.string('address')

        t.string('currency')
        t.string('type')
        t.string('work_phone')
        t.string('title')
        t.string('short_name')
        t.string('tax_type')

        t.uuid('institution_code').references('id').inTable('institutions')
            .notNullable()
        t.timestamp('created_at').defaultTo(knex.fn.now())
        t.timestamp('updated_at').defaultTo(knex.fn.now())
        t.timestamp('deleted_at').defaultTo(null)
    })
}


export async function down(knex: Knex): Promise<any> {
    await knex.schema.dropTable('contacts')
}

