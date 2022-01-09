import { config } from 'dotenv'
import { getEnvironmentVariable } from '../utils/environment-variable'
import NodeEnvType from '../enums/node-environments-enum'
import InvalidConfigurationError from '../errors/invalid-configuration-error'
import EnvironmentVariableName from '../enums/env-variables-enum'

config()

const nodeEnvironment = getEnvironmentVariable(EnvironmentVariableName.NODE_ENV, true)
if (NodeEnvType[nodeEnvironment.toUpperCase()] === undefined) {
    throw new InvalidConfigurationError(`Environment variable NODE_ENV is ${nodeEnvironment}. Allowed values are ${Object.keys(NodeEnvType)}`)
}

const envFilePath = `.env.${nodeEnvironment}`
config({ path: envFilePath })

const mongoDb = {
    URI: getEnvironmentVariable(EnvironmentVariableName.MONGODB_URI, true),
    DB_NAME: getEnvironmentVariable(EnvironmentVariableName.MONGODB_DB_NAME, true)
}

const app = {
    NODE_ENV: getEnvironmentVariable(EnvironmentVariableName.NODE_ENV, true),
    PORT: getEnvironmentVariable(EnvironmentVariableName.PORT, true),
    CORRELATION_ID_KEY: getEnvironmentVariable(EnvironmentVariableName.CORRELATION_ID_KEY, true),
    SERVICE_NAME: getEnvironmentVariable(EnvironmentVariableName.SERVICE_NAME, true),
}

const Configuration = {
    app,
    mongoDb
}

export default Configuration