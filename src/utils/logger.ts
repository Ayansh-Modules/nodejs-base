import * as winston from 'winston';
import { levels, transports } from '../configs/loggerConfig';
import { SERVICE_NAME } from '../constants/ServiceConstants';

const winstonLogger: winston.Logger = winston.createLogger({
    defaultMeta: { service: SERVICE_NAME },
    levels,
    transports
});

export default winstonLogger;