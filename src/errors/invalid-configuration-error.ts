import HttpStatusCode from '../enums/http-status-code-enum'
import BaseError from './base-error'

class InvalidConfigurationError extends BaseError {
    constructor(description: string) {
        super(InvalidConfigurationError.name, HttpStatusCode.INTERNAL_SERVER_ERROR, false, description)
    }
}

export default InvalidConfigurationError