# SubControl - work in progress

This repository includes frontend, backend and landing for the project

## Backend

### Technologies

- [Nest](https://github.com/nestjs/nest)
- Prisma ORM

### Some best/common practices:

- Dependencies injections
- DB Migrations
- DTOs for requests to prevent injections
- DTOs for responses to not expose sensitive fields 
- Same DTOs [are shared](packages/shared-dtos) between frontend and backend to have proper types
- Swagger documentation generated per code
