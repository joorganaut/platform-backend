import * as Knex from "knex";

/*
export interface InstitutionEntity extends Entity {
    name: string
    logo: string
    color: string
    background_color: string
    website: string
    email: string
    phone: string
    industry: string
    pass_phrase: string
    address: string
}
*/

export async function up(knex: Knex): Promise<any> {
    await knex.schema.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";')
    await knex.schema.createTable('institutions', (t) => {
        t.uuid('id')
            .notNullable()
            .primary()
            .unique()
            .defaultTo(knex.raw('uuid_generate_v4()'))
        t.string('name')
        t.string('logo')
        t.string('color').defaultTo('black')
        t.string('background_color').defaultTo('white')
        t.string('website')
        t.string('email')
        t.string('phone')
        t.string('industry')
        t.string('pass_phrase')
        t.string('address')
        t.timestamp('created_at').defaultTo(knex.fn.now())
        t.timestamp('updated_at').defaultTo(knex.fn.now())
        t.timestamp('deleted_at').defaultTo(null)
    })
}


export async function down(knex: Knex): Promise<any> {
    await knex.schema.dropTable('institutions')
}

