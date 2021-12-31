import http from "http";
import app from "./app";
import logger from "./utils/logger";

const server = http.createServer(app);

const port = process.env.PORT;

server.listen(port, (): void => {
  logger.info(`Server running on port ${port}`);
});