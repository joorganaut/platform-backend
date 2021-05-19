require('dotenv').config()

const path = require('path')

const base = {
    client: 'pg',
    useNullAsDefault: true,
    migrations: {
        extension: 'ts',
        directory: path.join(path.resolve(), 'db', 'migrations')
    },
    seeds: {
        extension: 'ts',
        directory: path.join(path.resolve(), 'db', 'seeds')
    }
}

const dbUrl = `postgresql://${process.env.DB_POSTGRES_USER}:${process.env.DB_POSTGRES_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_POSTGRES_DB}`
const dbTestUrl = `postgresql://${process.env.DB_POSTGRES_USER}:${process.env.DB_POSTGRES_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_POSTGRES_DB_TEST}`
// console.log(dbUrl)
interface Config {
    client: string
    useNullAsDefault: boolean
    migrations: {
        extension: string
        directory: string
    }
    seeds: {
        extension: string
        directory: string
    }
    connection: any
    pool: {
        min: number
        max: number
    }
}

interface MConfig {
    development: Config
    test: Config
    production: Config
}

const config: MConfig = {
    development: {
        ...base,
        connection: {
            connectionString: dbUrl,
            ssl: process.env.useSSL === 'true' ? { rejectUnauthorized: false } : false,
        },
        pool: {
            min: 2,
            max: 10
        }
    },
    test: {
        ...base,
        connection: dbTestUrl,
        pool: {
            min: 2,
            max: 10
        }
    },
    production: {
        ...base,
        connection: {
            connectionString: dbUrl,
            ssl: process.env.useSSL === 'true' ? { rejectUnauthorized: false } : false,
        },
        pool: {
            min: 2,
            max: 10
        }
    }
}
module.exports = config
