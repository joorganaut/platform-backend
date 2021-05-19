import * as Knex from "knex";


export async function up(knex: Knex): Promise<any> {
    await knex.schema.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";')
    await knex.schema.createTable('users', (t) => {
        t.uuid('id')
            .notNullable()
            .primary()
            .unique()
            .defaultTo(knex.raw('uuid_generate_v4()'))

        t.string('username')
            .notNullable()
            .unique()

        t.string('first_name')
        t.string('last_name')

        t.string('password')

        t.enu('auth_type', ['sso', 'creds'])
        t.string('cognito_id')

        t.boolean('enabled')
        t.boolean('is_onboarded')

        t.timestamp('created_at').defaultTo(knex.fn.now())
        t.timestamp('updated_at').defaultTo(knex.fn.now())
        t.timestamp('deleted_at').defaultTo(null)
    })

}


export async function down(knex: Knex): Promise<any> {

    await knex.schema.dropTable('users')
}

