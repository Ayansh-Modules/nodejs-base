import * as winston from "winston";
import * as Transport from 'winston-transport';

/**
 * @param level string Filter function will allow logging only this specified log level
 * @returns winston.Logform.Format
 */
function filter(level: string): winston.Logform.Format {
    return winston.format((info) => {
        if (info.level === level) {
            return info;
        }
        return false;
    })();
}

const levels: winston.config.AbstractConfigSetLevels = {
    fatal: 0,
    error: 1,
    warn: 2,
    info: 3,
    debug: 4,
    http: 5,
};

const transports: Transport[] = [
    // Log error+ information to a file
    new winston.transports.File({
        filename: "logs/error.log",
        level: "error",
        format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
        )
    }),
    // Log info+ information to a file
    new winston.transports.File({
        filename: "logs/combined.log",
        level: "info",
        format: winston.format.simple()
    }),
    // Log debug+ information to a file
    new winston.transports.File({
        filename: "logs/debug.log",
        level: "debug",
        format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.json()
        )
    }),
    // Log http information to a file
    new winston.transports.File({
        filename: "logs/http.log",
        level: "http",
        format: filter("http"),
    }),
    // Log debug+ information to the console
    new winston.transports.Console({
        level: "debug",
        format: winston.format.combine(
        winston.format.colorize(),
        winston.format.timestamp(),
        winston.format.simple()
        )
    }),
];

export {levels, transports};
