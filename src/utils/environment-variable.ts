import EnvironmentVariableName from '../enums/env-variables-enum'
import InvalidConfigurationError from '../errors/invalid-configuration-error'

export function getEnvironmentVariable(variableName: EnvironmentVariableName, required: boolean = false): string {
    const data = process.env[variableName] || ''
    /**
     * If data is not required then return empty string
     * If data is required and data is not equal to empty string then return data
     * In all other cases throw an error
     */
    if (!required || data !== '') return data
    throw new InvalidConfigurationError(`Environment variable ${variableName} is not set`)
}