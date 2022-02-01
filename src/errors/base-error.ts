import HttpStatusCode from 'src/enums/http-status-code-enum'

class BaseError extends Error {
    public readonly name: string
    public readonly httpCode: HttpStatusCode
    public readonly isOperational: boolean

    /**
     * @param name Name of the Error
     * @param httpCode Http Status Code for this error
     * @param isOperational Specifies whether an error is an operational or not
     *
     * Operational errors represent runtime problems whose results are expected and should be dealt with in a proper way.
     * They don’t mean the application itself has bugs, but developers need to handle them thoughtfully.
     * Examples of operational errors include “out of memory,” “an invalid input for an API endpoint,” and so on.
     *
     * Programmer errors represent unexpected bugs in poorly written code. They mean the code itself has some issues to solve and was coded wrong.
     * A good example is to try to read a property of “undefined.” To fix the issue, the code has to be changed.
     * That is a bug a developer made, not an operational error.
     * @param description A descriptive message to specify "how/when/why" of the error being thrown
     */
    constructor(name: string, httpCode: HttpStatusCode, isOperational: boolean, description: string) {
        super(description)
        Object.setPrototypeOf(this, new.target.prototype)

        this.name = name
        this.httpCode = httpCode
        this.isOperational = isOperational

        Error.captureStackTrace(this)
    }
}

export default BaseError