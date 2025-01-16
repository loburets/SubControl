# SubControl - work in progress

A project to track your subscriptions' spending.

## Backend

### Technologies

- TypeScript
- NestJS
- Prisma ORM
- PostgreSQL

### Some used best practices:

- The Testing Trophy instead of the testing pyramid [(the tests are here)](apps/backend/tests)
- The integration tests were made for controllers and ready to be run in parallel on a single DB instance
- [DB Migrations](apps/backend/prisma/migrations) are used to keep the DB schema in sync with the [schema in code](apps/backend/prisma/schema.prisma)
- DTOs for requests to prevent injections and validate the input
- DTOs for responses to not expose sensitive fields 
- The same DTOs [are shared](packages/shared-dtos) between frontend and backend
- Swagger documentation is generated per code and can [run requests on behalf of a test user](apps/backend/src/utils/swagger.ts)
- Money are stored as cents (integer value)
- Winston logger with [different transports](apps/backend/src/config/winston-logger.config.ts) for different environments
- BugSnag integration (Sentry alternative)
