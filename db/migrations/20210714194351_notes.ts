import * as Knex from "knex";

/*
export interface NoteEntity extends Entity {
    name: string
    type: NoteType
    status: NoteStatus
    description: string
    is_recurring: boolean
    interval: any
}
*/

export async function up(knex: Knex): Promise<any> {
    await knex.schema.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";')
    await knex.schema.createTable('notes', (t) => {
        /**Parent Properties start */
        t.uuid('id')
            .notNullable()
            .primary()
            .unique()
            .defaultTo(knex.raw('uuid_generate_v4()'))
        t.uuid('institution_code').references('id').inTable('institutions')
            .notNullable()
        t.timestamp('created_at').defaultTo(knex.fn.now())
        t.timestamp('updated_at').defaultTo(knex.fn.now())
        t.timestamp('deleted_at').defaultTo(null)
        /**Parent Properties end */

        t.string('name')
        t.integer('type')
        t.integer('status')
        t.string('description')
        t.boolean('is_recurring')
        t.integer('interval')
    })
}


export async function down(knex: Knex): Promise<any> {
    await knex.schema.dropTable('notes')
}

