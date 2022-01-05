import * as winston from 'winston'
import { levels, transports } from '../configs/logger-config'
import { SERVICE_NAME } from '../constants/service-constants'

const winstonLogger: winston.Logger = winston.createLogger({
    defaultMeta: { service: SERVICE_NAME },
    levels,
    transports,
    exitOnError: false,
})

export default winstonLogger