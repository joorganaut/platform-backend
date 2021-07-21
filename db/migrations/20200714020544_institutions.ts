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
        t.string('name').nullable()
        t.string('logo').nullable()
        t.string('color').defaultTo('black')
        t.string('background_color').defaultTo('white')
        t.string('website').nullable()
        t.string('email').nullable()
        t.string('phone').nullable()
        t.string('industry').nullable()
        t.string('pass_phrase').nullable()
        t.string('address').nullable()
        t.timestamp('created_at').defaultTo(knex.fn.now())
        t.timestamp('updated_at').defaultTo(knex.fn.now())
        t.timestamp('deleted_at').defaultTo(null)
    })
}


export async function down(knex: Knex): Promise<any> {
    await knex.schema.dropTable('institutions')
}

