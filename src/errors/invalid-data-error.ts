import HttpStatusCode from '../enums/http-status-code-enum'
import BaseError from './base-error'

class InvalidDataError extends BaseError {
    constructor(description: string, httpCode: HttpStatusCode) {
        super(InvalidDataError.name, httpCode, false, description)
    }
}

export default InvalidDataError