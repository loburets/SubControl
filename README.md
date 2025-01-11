# SubControl - work in progress

This repository includes frontend, backend and landing for the project

## Backend

### Technologies

- TypeScript
- NestJS
- Prisma ORM
- PostgreSQL

### Some used best practices:

- Dependencies injections
- DB Migrations
- DTOs for requests to prevent injections
- DTOs for responses to not expose sensitive fields 
- Same DTOs [are shared](packages/shared-dtos) between frontend and backend to have proper types
- Swagger documentation generated per code and can [run requests a for test user](apps/backend/src/utils/swagger.ts)
- Money are stored as cents (integer value)
- Integration tests for controllers' methods
