import { Context, Next } from 'koa'
import { UnauthorizedError } from '../lib/errors'
import * as logger from '../utils/logger'
import { getValueFromJwt } from '../services/admin/security.service'
import { findUserById, findUserByIdWithInstitutionCode } from '../services/users/users.service'


const getJWT = (authorization: string): string | null => {
    const parts = authorization && authorization.split(' ')
    if (!parts) return null
    if (parts.length === 2 && (parts[0] === 'Bearer' || parts[0] === 'Basic')) {
        return parts[1]
    }

    return null
}

const checkApiKey = (apiKey: string | undefined) => apiKey && apiKey === process.env.API_KEY

export const authMiddleware = async (ctx: Context, next: Next) => {
    if (!ctx.headers.authorization && !ctx.headers['x-api-key']) {
        throw new UnauthorizedError(__filename, 'Missing authorization header')
    }

    const jwt = getJWT(ctx.headers.authorization as string)
    const institutionCode = ctx.headers['institutionCode']
    const usesApiKey = checkApiKey(ctx.headers['x-api-key'] as string)

    if (!jwt && !usesApiKey) {
        throw new UnauthorizedError(__filename, 'Missing authorization header')
    }

    if (usesApiKey && (process.env.NODE_ENV !== 'test')) {
        logger.info('Accessed via API key', __filename)
    }

    if (jwt && !usesApiKey) {
        try {
            logger.info(ctx.URL.pathname, __filename)
            const tokenPayload = getValueFromJwt(jwt) as any
            const user = institutionCode ? await findUserByIdWithInstitutionCode(tokenPayload.id, institutionCode as string) : await findUserById(tokenPayload.id)

            if (!user) {
                throw new UnauthorizedError(__filename, 'Unable to retrieve user')
            }
        } catch (err) {
            throw new UnauthorizedError(__filename, err.message)
        }
    }

    await next()
}