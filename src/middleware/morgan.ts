import morgan from "morgan";
import logger from '../utils/logger';

const morganMiddleware = morgan('combined', {
    stream: {
        write: (msg) => logger.http(msg)
    }
});

export default morganMiddleware;