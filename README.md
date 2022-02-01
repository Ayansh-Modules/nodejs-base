# nodejs-base

## TODO

1. Add logger transports
   1. AWS Cloudwatch
2. Convert to node library & host it privately (use Verdaccio)
3. Add notifications for errors
   1. Slack
   2. Email
   3. Sentry
   4. etc etc
4. Sign each and every API key from and to different services
5. Rate limiting

## Points to remember

1. *Always* use logger util (exceptional cases aside) to log things
2. *Always* add strings (or constant data in general) to a constants file and import data from there
3. *Always* add configurations to [environment variable files](#environment-files) and then to following 2 files [env-variables-enum](src/enums/env-variables-enum.ts), and [app-config.ts](src/configs/app-config.ts) appropriately
4. *Always* define errors for specific scenarios by extending [BaseException](src/errors/base-error.ts) or another (error) class which extends BaseException
5. *Always* pass errors to the centralised error handling mechanism using next(error)
6. For any non-scenario specific feature/functionality, add utilities for the same
7. *Always* use the utility [got](src/utils/got.ts) tor any external API/Unix/RPC call. If there are more customisations you want to do then add them as builder options inside this utility

## Naming conventions to use

| Type                                   | Convention                              |
| -------------------------------------- | --------------------------------------- |
| File Name                              | Hyphenated words; All lower-case        |
| Folder Name                            | All lower-case (even if multiple words) |
| Variables names                        | Camel-case with first letter lower-case |
| Enum constants                         | Underscored words; All upper-case       |
| Constants/Configurations named exports | Camel-case with first letter upper-case |

## Environment files

1. `.env`
   1. NODE_ENV
2. `.env.`**`<NODE_ENV value>`** (Example: .env.development)
   
   Example File
   ```
   MONGODB_URI=mongodb://localhost:27017
   MONGODB_DB_NAME=db-name
   PORT=3001
   CORRELATION_ID_KEY=x-correlation-id
   SERVICE_NAME=base-service
   LOG_DIRECTORY=logs
   LOG_RENTETION=30d
   LOG_MAX_FILE_SIZE=20m
   ```

## Resources to use
1. https://github.com/sindresorhus/got/blob/main/documentation/tips.md