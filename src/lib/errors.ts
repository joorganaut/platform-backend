/*
 * The value of the 'payload' parameter can be either an object, or undefined
 * This method checks if the `payload` is an object
 * If the `payload` is an object, then the method attempts to fetch `type` property
 * If the 'payload' is not an object or it does not have the specified property, the method return the 'defaultValue'
 */

export interface Payload {
    code?: number
    status?: number
    message?: string
    stack?: string
}

export interface AdditionalInfo {
    applicationId?: string
    carrierId?: string
    productGroupId?: number
    productId?: number
    contactId?: string
    contactName?: string
}

//  Sanitize the error stack and return it as an array of lines
const sanitizeErrorStack = (stack: string): string[] => {
    //  Escape any special character in the encryption key
    const escapedKeyPattern = String(process.env.DB_PGP_KEY).replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&')
    //  Create a regular expression with the escaped encryption key pattern and a global scope
    const escapedKeyRegex = new RegExp(escapedKeyPattern, 'g')
    //  Set the replace value to a set of asterisks with the last 4 chars of the encryption key peeking out
    const escapedKeyReplaceValue = `****${process.env.DB_PGP_KEY?.slice(-4)}`

    //  Create a regular expression to catch everything inside of the brackets of the pgp_sym_encrypt method
    const encryptionMethodRegex = /pgp_sym_encrypt\(.+?\)/g
    //  Set the replace value to the pgp_sym_encrypt method with the first parameter replaced by asterisks
    const encryptionMethodRegexReplaceValue = `pgp_sym_encrypt(***, ${escapedKeyReplaceValue})`

    //  Run the regex on the provided error stack to hide the encryption key and the answers value inside of the pgp_sym_encrypt method parameters
    const sanitizedStack = stack
        .replace(escapedKeyRegex, escapedKeyReplaceValue)
        .replace(encryptionMethodRegex, encryptionMethodRegexReplaceValue)
    // Split the stack at the end-of-line character
    return sanitizedStack.split(/\n/g)
}

const getErrorMessages = (
    payload: Payload | undefined,
    message: string,
    moduleName: string
): { errMessage: string; className: string } => {
    const errMessage = message || 'Something went wrong'
    const className = moduleName

    if (!payload || !payload.stack) {
        return {
            errMessage,
            className
        }
    }
    const lines = sanitizeErrorStack(payload.stack.toString())
    return {
        errMessage: lines[0].trim(),
        className: lines[1].trim()
    }
}

export class BPTNError extends Error {
    moduleName: string
    additionalInfo: object
    httpMessage: string
    httpStatus: number
    errMessage: string
    errCode: number

    constructor(moduleName: string, message: string, payload?: Payload, additionalInfo?: AdditionalInfo) {
        super(message)
        const { errMessage, className } = getErrorMessages(payload, message, moduleName)
        this.name = 'BPTN Error'
        this.moduleName = className || moduleName
        this.additionalInfo = additionalInfo || {}
        this.httpMessage = message || 'Something went wrong'
        this.httpStatus = (payload && payload.status) || 500
        this.errMessage = errMessage
        this.errCode = (payload && payload.code) || 9999
    }
}

export class BadRequestError extends BPTNError {
    constructor(moduleName: string, message: string, payload?: Payload, additionalInfo?: AdditionalInfo) {
        super(moduleName, message, payload, additionalInfo)
        this.httpStatus = 400
    }
}

export class UnauthorizedError extends BPTNError {
    constructor(moduleName: string, message: string, payload?: Payload, additionalInfo?: AdditionalInfo) {
        super(moduleName, message, payload, additionalInfo)
        this.httpStatus = 401
    }
}

export class ForbiddenError extends BPTNError {
    constructor(moduleName: string, message: string, payload?: Payload, additionalInfo?: AdditionalInfo) {
        super(moduleName, message, payload, additionalInfo)
        this.httpStatus = 403
    }
}

export class NotFoundError extends BPTNError {
    constructor(moduleName: string, message: string, payload?: Payload, additionalInfo?: AdditionalInfo) {
        super(moduleName, message, payload, additionalInfo)
        this.httpStatus = 404
    }
}

export class MethodNotAllowedError extends BPTNError {
    constructor(moduleName: string, message: string, payload?: Payload, additionalInfo?: AdditionalInfo) {
        super(moduleName, message, payload, additionalInfo)
        this.httpStatus = 405
    }
}

export class InternalServerError extends BPTNError {
    constructor(moduleName: string, message: string, payload?: Payload, additionalInfo?: AdditionalInfo) {
        super(moduleName, message, payload, additionalInfo)
        this.httpStatus = 500
    }
}
