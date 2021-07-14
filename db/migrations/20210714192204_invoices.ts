import * as Knex from "knex";

/*
export interface InvoiceEntity extends Entity {
    project?: string
    contact: string
    status: InvoiceStatus
    description: string
    total_amount: string
    has_tax: boolean
    tax_content: InvoiceContent[] | string
    content: InvoiceContent[] | string
    client: string
    expiryDate?: Date
    is_recurring: boolean
    interval?: any
}
*/


export async function up(knex: Knex): Promise<any> {
    await knex.schema.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";')
    await knex.schema.createTable('invoices', (t) => {
        t.uuid('id')
            .notNullable()
            .primary()
            .unique()
            .defaultTo(knex.raw('uuid_generate_v4()'))
        t.uuid('project').references('id').inTable('projects').nullable()
        t.uuid('contact').references('id').inTable('contacts').notNullable()
        t.integer('status')
        t.string('description')
        t.decimal('total_amount', 10, 2)
        t.boolean('has_tax')
        t.jsonb('tax_content')
        t.jsonb('content')
        t.string('client')
        t.dateTime('expiryDate').nullable()
        t.boolean('is_recurring')
        t.integer('interval').nullable()

        t.uuid('institution_code').references('id').inTable('institutions')
            .notNullable()
        t.timestamp('created_at').defaultTo(knex.fn.now())
        t.timestamp('updated_at').defaultTo(knex.fn.now())
        t.timestamp('deleted_at').defaultTo(null)
    })
}


export async function down(knex: Knex): Promise<any> {
    await knex.schema.dropTable('invoices')
}

