import * as Knex from "knex";

/*
export interface ProjectEntity extends Entity {
    name: string
    start_date: Date
    end_date: Date
    description: string
    status: ProjectStatus
}
*/

export async function up(knex: Knex): Promise<any> {
    await knex.schema.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";')
    await knex.schema.createTable('projects', (t) => {
        t.uuid('id')
            .notNullable()
            .primary()
            .unique()
            .defaultTo(knex.raw('uuid_generate_v4()'))
        t.dateTime('start_date')
        t.dateTime('end_date')
        t.string('name')
        t.string('description')
        t.integer('status')

        t.uuid('institution_code').references('id').inTable('institutions')
            .notNullable()
        t.timestamp('created_at').defaultTo(knex.fn.now())
        t.timestamp('updated_at').defaultTo(knex.fn.now())
        t.timestamp('deleted_at').defaultTo(null)
    })
}


export async function down(knex: Knex): Promise<any> {
    await knex.schema.dropTable('projects')
}

