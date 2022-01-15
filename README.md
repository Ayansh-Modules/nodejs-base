# nodejs-base

## TODO

1. Add logger transports
   1. AWS Cloudwatch
2. Convert to node library & host it privately (use Verdaccio)
3. All external API calls add correlation ID
4. Add notifications for errors
   1. Slack
   2. Email
   3. Sentry
   4. etc etc

## Points to remember

1. Always use logger util (exceptional cases aside)
2. Always add strings (or constant data in general) to a constants file and import data from there
3. Add configurations to [environment variable files](#environment-files) and then to [app-config.ts](src/configs/app-config.ts) & [env-variables-enum](src/enums/env-variables-enum.ts) appropriately
4. Always define errors for specific scenarios by extending [BaseException](src/errors/base-error.ts) or another (error) class which extends BaseException
5. Pass errors to the centralised error handling mechanism using next(error) passing ALWAYS
6. For any non-scenario specific feature/functionality, add utilities for the same

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
   1. MONGODB_URI
   2. MONGODB_DB_NAME
   3. PORT
   4. CORRELATION_ID_KEY
   5. SERVICE_NAME
