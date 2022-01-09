import { connect as mongodbConnect, ConnectOptions } from 'mongoose'
import logger from '../utils/logger'
import NodeEnvType from '../enums/node-environments-enum'
import Configuration from './app-config'

export function connectToMongoDB() {

    const options: ConnectOptions = {
        autoIndex: Configuration.app.NODE_ENV === NodeEnvType.PRODUCTION,
        autoCreate: Configuration.app.NODE_ENV === NodeEnvType.PRODUCTION,
        dbName: Configuration.mongoDb.DB_NAME
    }

    mongodbConnect(Configuration.mongoDb.URI, options)
        .then(() => {
            logger.info('Successfully connected to MongoDB')
        })
        .catch((error: Error) => {
            logger.error('MongoDB connection failed. Exiting now...')
            logger.error(error)
            process.exit(1)
        })

}