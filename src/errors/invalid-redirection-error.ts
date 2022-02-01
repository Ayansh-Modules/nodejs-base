import HttpStatusCode from '../enums/http-status-code-enum'
import BaseError from './base-error'

class InvalidRedirectionError extends BaseError {
    constructor(description: string) {
        super(InvalidRedirectionError.name, HttpStatusCode.INTERNAL_SERVER_ERROR, false, description)
    }
}

export default InvalidRedirectionError