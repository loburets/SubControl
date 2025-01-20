# SubControl - work in progress

Frontend, backend and landing for the project

## Some good practices:

- Same DTOs [are shared](packages/shared-dtos) between frontend and backend to have proper types
- [Eslint](.eslintrc.js) and [Prettier](.prettierrc) are used to enforce code style
- [Npm workspaces](package.json)
- [.nvmrc](.nvmrc) for Node version
- Docker to run DB locally
- More of the practices see below

## Backend

### Technologies

- TypeScript
- NestJS
- PostgreSQL
- Prisma ORM

### Some good practices:

- The Testing Trophy instead of the testing pyramid [(the tests are here)](apps/backend/tests)
- Integration tests made for controllers and they are ready to be run in parallel on the same DB
- DB Migrations
- DTOs for requests to prevent injections
- DTOs for responses to not expose sensitive fields
- Enums for DB/Prisma and in Request/Responses types ([example](packages/shared-dtos/src/subscriptions/requests.dto.ts))
- Swagger documentation generated per [ts decorators](apps/backend/src/modules/subscriptions/subscriptions.controller.ts) and can [run requests on behalf of a test user](apps/backend/src/utils/swagger.ts)
- Money are stored as cents (integer value)
- Winston logger with [different transports](apps/backend/src/config/winston-logger.config.ts) for different environments
- No sensitive data in logs, only ids
- BugSnag integration (Sentry alternative for errors tracking)
- No circular dependencies due to [Nest Modules](apps/backend/src/modules/subscriptions/subscriptions.module.ts)

## Frontend

### Technologies

- TypeScript
- React
- Ant Design
- React Hook Form
- Styled Components
- React Query + Zustand

### Some good practices:

- Light/Dark theme [with dynamic changing](apps/frontend/src/components/Layout/AntConfigProvider.tsx) and [default value from device](apps/frontend/src/hooks/useTheme.ts)
- [Tokens in styles](apps/frontend/src/components/Layout/Layout.styled.tsx)
