# SubControl - work in progress

This repository includes frontend, backend and landing for the project

## Backend

### Technologies

- [Nest](https://github.com/nestjs/nest)
- Prisma ORM

### Some used best practices:

- Dependencies injections
- DB Migrations
- DTOs for requests to prevent injections
- DTOs for responses to not expose sensitive fields 
- Same DTOs [are shared](packages/shared-dtos) between frontend and backend to have proper types
- Swagger documentation generated per code and can [run requests for test user](apps/backend/src/utils/swagger.ts)
- Money are stored as cents (integer value)
- Integration tests for controllers' methods
