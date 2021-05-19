import * as Knex from "knex";


export async function up(knex: Knex): Promise<any> {
    await knex.schema.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";')
    await knex.schema.createTable('event_attendees', (t) => {
        t.uuid('id')
            .primary()
            .notNullable()
            .defaultTo(knex.raw('uuid_generate_v4()'))

        t.uuid('attendee_id')
            .references('id')
            .inTable('profiles')
            .unique()

        t.uuid('event_id')
            .references('id')
            .inTable('events')

        t.enu('payment_status', ['value1', 'value2'])

        t.timestamp('created_at').defaultTo(knex.fn.now())
        t.timestamp('updated_at').defaultTo(knex.fn.now())
        t.timestamp('deleted_at').defaultTo(null)
    })
}


export async function down(knex: Knex): Promise<any> {
    await knex.schema.dropTable('event_attendees')
}

