import { connect as mongodbConnect, ConnectOptions } from 'mongoose';
import logger from '../utils/logger';
import { PRODUCTION } from '../constants/NodeEnvConstants';

export function connectToMongoDB() {

    const { DB_NAME, MONGO_URI, NODE_ENV } = process.env;

    const options: ConnectOptions = {
        autoIndex: NODE_ENV === PRODUCTION,
        autoCreate: NODE_ENV === PRODUCTION,
    }

    if (DB_NAME) {
        options.dbName = DB_NAME;
    }

    mongodbConnect(MONGO_URI!, options)
    .then(() => {
        logger.info("Successfully connected to mongoDB database");
    })
    .catch((error: Error) => {
        logger.error("MongoDB connection failed. Exiting now...");
        logger.error(error);
        process.exit(1);
    });

}