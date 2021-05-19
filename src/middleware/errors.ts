import { Context, Next } from 'koa'
import * as logger from '../utils/logger'
import { BPTNError } from '../lib/errors'

// Lives at the very beggining of the app chain, catches any errors that occur in the app
// Converts the errors to FineaoError if they aren't already
// Emits them to the global error handler
export const errorEmitter = async (ctx: Context, next: Next) => {
    try {
        await next()
    } catch (e) {
        if (process.env.DEBUG_LOGS === 'true') {
            // eslint-disable-next-line no-console
            console.log(e)
        }

        const error: BPTNError = !(e instanceof BPTNError)
            ? new BPTNError(__filename, e.name || e.message || e, e)
            : e

        ctx.app.emit('error', error, ctx)
    }
}

// Lives at the very end of the app chain, listens for emitted errors
// Logs the errors and formats the response
export const errorHandler = async (err: BPTNError, ctx: Context) => {
    logger.error(err, __filename)

    // Hiding internal fields from the user
    const response = {
        httpMessage: err.httpMessage,
        httpStatus: err.httpStatus,
        errMessage: 'Something went wrong',
        errCode: err.errCode
    }

    // Define response
    ctx.type = 'json'
    ctx.status = err.httpStatus || 500
    ctx.body = response
}
