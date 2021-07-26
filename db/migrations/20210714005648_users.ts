import * as Knex from "knex";


/*id?: string
    username: string
    first_name: string
    last_name: string
    password?: string
    auth_type: string
    cognito_id: string
    enabled: boolean
    role: string
    is_onboarded: boolean
    image?: string
    welcomed: boolean
    onboarding_questions?: string | QuestionAnswer[]
    sso_type: string
    verification_link: string
    access_token: string
    signout_requested?: boolean
    transaction_pin: string,
    is_authenticated: boolean,
    force_password_change: boolean,
    last_login_date: Date,
    number_of_failed_attempts: number
*/

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
        t.jsonb('onboarding_questions')



        t.string('first_name')
        t.string('last_name')

        t.string('password')

        t.enu('auth_type', ['sso', 'creds'])
        t.string('cognito_id')

        t.boolean('enabled')

        t.string('role')
        t.boolean('is_onboarded')
        t.string('image', 2000).nullable()
        t.string('sso_type')
        t.string('verification_link')
        t.string('access_token', 1000)
        t.boolean('signout_requested').nullable()
        t.string('transaction_pin')
        t.boolean('is_authenticated')
        t.boolean('force_password_change')
        t.boolean('force_pin_change')
        t.dateTime('last_login_date')
        t.integer('number_of_failed_attempts')

        t.uuid('institution_code').references('id').inTable('institutions')
            .notNullable()
        t.timestamp('created_at').defaultTo(knex.fn.now())
        t.timestamp('updated_at').defaultTo(knex.fn.now())
        t.timestamp('deleted_at').defaultTo(null)
    })

}


export async function down(knex: Knex): Promise<any> {
    await knex.schema.dropTable('users')
}

