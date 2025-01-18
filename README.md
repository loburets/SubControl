# SubControl - work in progress

This repository includes frontend, backend and landing for the project

## Backend

### Technologies

- TypeScript
- NestJS
- Prisma ORM
- PostgreSQL

### Some used best practices:

- The Testing Trophy instead of the testing pyramid [(the tests are here)](apps/backend/tests)
- Integration tests made for controllers and they are ready to be run in parallel on the same DB
- DB Migrations
- DTOs for requests to prevent injections
- DTOs for responses to not expose sensitive fields 
- Same DTOs [are shared](packages/shared-dtos) between frontend and backend to have proper types
- Enums for DB/Prisma and in Request/Responses types ([example](packages/shared-dtos/src/subscriptions/requests.dto.ts))
- Swagger documentation generated per [ts decorators](apps/backend/src/modules/subscriptions/subscriptions.controller.ts) and can [run requests on behalf of a test user](apps/backend/src/utils/swagger.ts)
- Money are stored as cents (integer value)
- Winston logger with [different transports](apps/backend/src/config/winston-logger.config.ts) for different environments
- BugSnag integration (Sentry alternative)
