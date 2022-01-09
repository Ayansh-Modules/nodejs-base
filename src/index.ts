import http from 'http'
import app from './app'
import logger from './utils/logger'
import Configuration from './configs/app-configuration'

const server = http.createServer(app)

const port = Configuration.app.PORT

server.listen(port, (): void => {
  logger.info(`Server running on port ${port}`)
})