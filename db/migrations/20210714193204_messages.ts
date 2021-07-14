import * as Knex from "knex";

/*
export interface MessageEntity extends Entity {
    id?: string
    title: string
    sender_id: string
    receiver_id: string
    type: string
    status: MessageStatus
    error: string
    content: string | any[]
}
*/
export async function up(knex: Knex): Promise<any> {
    await knex.schema.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";')
    await knex.schema.createTable('messages', (t) => {
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

        t.string('title')
        t.string('sender_id')
        t.string('receiver_id')
        t.string('type')
        t.integer('status')
        t.string('error')
        t.jsonb('content')
    })

}


export async function down(knex: Knex): Promise<any> {
    await knex.schema.dropTable('messages')
}

