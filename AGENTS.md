# AGENTS.md

> Documentation for AI agents and developers working with the SubControl codebase

## Project Overview

SubControl is a full-stack subscription tracking application built as a demonstration of modern web development best practices. The project showcases a production-ready monorepo architecture with comprehensive testing, CI/CD, and infrastructure as code.

**Live Demo:** [https://subcontrol.online/](https://subcontrol.online/)  
**API Documentation:** [https://backend-u7jt.onrender.com/api/](https://backend-u7jt.onrender.com/api/)

## Architecture

### Monorepo Structure

This is an npm workspaces monorepo with the following structure:

```
SubControl/
├── apps/
│   ├── backend/        # NestJS API server
│   ├── frontend/       # React SPA application
│   └── landing/        # Next.js landing page
├── packages/
│   └── shared-dtos/    # Shared TypeScript DTOs between frontend/backend
└── e2e/               # Playwright end-to-end tests
```

### Technology Stack

**Backend (apps/backend/):**
- NestJS with TypeScript (strict mode)
- PostgreSQL with Prisma ORM
- JWT authentication with Passport
- Winston logging
- BugSnag error tracking
- Swagger/OpenAPI documentation
- Jest for testing (90% coverage requirement)

**Frontend (apps/frontend/):**
- React 19 with TypeScript
- Ant Design UI components
- TanStack React Query for data fetching
- Zustand for state management
- Styled Components with design tokens
- React Testing Library

**Landing Page (apps/landing/):**
- Next.js with App Router
- Mantine UI components
- Hybrid rendering (SSG + CSR)
- Shared theme state with main app

**E2E (e2e/):**
- Playwright for end-to-end testing

## Key Domain Models

### User
- `id`: Auto-increment integer
- `email`: Unique identifier
- `password`: Bcrypt hashed
- `isDemo`: Boolean flag for demo accounts
- Relations: Has many subscriptions

### Subscription
- `id`: Auto-increment integer
- `name`: Subscription name
- `userId`: Foreign key to User
- `period`: Enum (YEARLY, MONTHLY, WEEKLY)
- `centsPerPeriod`: Integer (money stored as cents for precision)
- `currency`: Enum (USD, EUR, GBP, JPY, AUD, CAD, RUB, TRY, OTHER)
- `startedAt`: Date
- `cancelledAt`: Optional date
- `deletedAt`: Soft delete timestamp

**Location:** `/apps/backend/prisma/schema.prisma`

## Development Workflow

### Prerequisites
- Node.js version specified in `.nvmrc`
- Docker (for local PostgreSQL)
- npm >= 8.0.0

### Setup Commands

```bash
# Install dependencies
npm install

# Start local database
docker-compose up -d

# Run migrations
cd apps/backend
npx prisma migrate dev

# Start backend (development)
cd apps/backend
npm run start:dev

# Start frontend (development)
cd apps/frontend
npm start

# Start landing page (development)
cd apps/landing
npm run dev

# Run E2E tests
cd e2e
npm test
```

### Build Commands

```bash
# Build shared DTOs (required before building apps)
npm run build:dtos

# Build backend
cd apps/backend
npm run build

# Build frontend
cd apps/frontend
npm run build

# Build landing
cd apps/landing
npm run build
```

## Code Organization

### Backend Module Structure

The backend follows NestJS module architecture with no circular dependencies:

- **auth/**: JWT authentication, login/register endpoints
- **users/**: User management
- **subscriptions/**: CRUD operations for subscriptions
- **health/**: Health check endpoints
- **transformers/**: Response filtering service to prevent sensitive data exposure
- **prisma/**: Database service module

**Key Files:**
- `/apps/backend/src/main.ts` - Application bootstrap, CORS, validation pipes, global filters
- `/apps/backend/src/app.module.ts` - Root module
- `/apps/backend/src/utils/swagger.ts` - Swagger configuration with demo user support
- `/apps/backend/src/config/winston-logger.config.ts` - Logging configuration

### Frontend Structure

- **components/**: Reusable UI components
- **pages/**: Route-level components
- **queries/**: React Query hooks for API calls
- **hooks/**: Custom React hooks (e.g., `useDemo.ts`)
- **store/**: Zustand stores (e.g., theme switcher)
- **router/**: React Router configuration
- **utils/**: Utility functions

### Shared DTOs

The `packages/shared-dtos/` package contains TypeScript interfaces and validation DTOs that are shared between frontend and backend, ensuring type safety across the stack.

**Structure:**
- `auth/`: Login/register DTOs
- `subscriptions/`: Subscription request/response DTOs

## Testing Strategy

### Backend Testing (Testing Trophy Approach)

1. **Integration Tests** (`apps/backend/tests/integration/`)
   - Test controllers with real database (test DB)
   - Can run in parallel
   - Example: `subscriptions.controller.spec.ts`

2. **Unit Tests** (`apps/backend/tests/unit/`)
   - Test individual services and utilities
   - Example: `prisma.service.spec.ts`

3. **E2E Tests** (`apps/backend/tests/e2e/`)
   - Test full API workflows
   - Configuration: `jest-e2e.json`

**Coverage Requirement:** 90% (configured in `jest.config.js`)

### Frontend Testing

- React Testing Library for component integration tests
- Example: `apps/frontend/src/pages/Login.test.tsx`

### E2E Testing

- Playwright tests for critical user flows
- Example: `e2e/tests/main-flow-smoke.spec.ts`

## Security Practices

1. **Request Validation**: ValidationPipe with `whitelist: true` removes extra fields
2. **Response Filtering**: Transformer service filters responses per DTOs
3. **Password Security**: Bcrypt hashing
4. **JWT Authentication**: Secure token-based auth
5. **CORS**: Configured for specific origins only
6. **No Sensitive Logs**: Only log IDs, never passwords or tokens

## API Structure

### Base URL
- Production: `https://backend-u7jt.onrender.com/api/v1`
- Local: `http://localhost:3001/api/v1`

### Main Endpoints

**Auth:**
- `POST /auth/register` - Register new user
- `POST /auth/login` - Login and get JWT token

**Subscriptions:**
- `GET /subscriptions` - List user's subscriptions
- `POST /subscriptions` - Create subscription
- `GET /subscriptions/:id` - Get single subscription
- `PATCH /subscriptions/:id` - Update subscription
- `DELETE /subscriptions/:id` - Soft delete subscription

**Health:**
- `GET /health` - Health check

### Authentication

All protected endpoints require JWT token in Authorization header:
```
Authorization: Bearer <token>
```

## Database

### Connection
- Uses Prisma ORM
- Connection string in `DATABASE_URL` environment variable
- Local dev uses Docker PostgreSQL (docker-compose.yml)

### Migrations
- Location: `/apps/backend/prisma/migrations/`
- Command: `npx prisma migrate dev`
- All migrations are version controlled

### Seeds
- Seed files in `/apps/backend/tests/seeds/`
- Used for testing

## Environment Variables

### Backend (.env)
```
DATABASE_URL=postgresql://user:password@localhost:5432/main_database
JWT_SECRET=your-secret-key
BUGSNAG_API_KEY=your-bugsnag-key
NODE_ENV=development|production
```

### Frontend
```
REACT_APP_API_URL=http://localhost:3001/api/v1
```

## CI/CD

### GitHub Actions
- Location: `.github/workflows/`
- Runs on: Push to main, pull requests
- Checks:
  - Linting (ESLint)
  - Code formatting (Prettier)
  - Tests (Jest, Playwright)
  - Build validation

### Deployment
- Infrastructure as code: `render.yaml`
- Backend hosted on Render
- Frontend hosted on Render
- Landing page hosted on Render

## Code Quality Standards

### Linting & Formatting
```bash
# Lint all code
npm run lint

# Fix linting issues
npm run lint:fix

# Check formatting
npm run format:check

# Format code
npm run format
```

### TypeScript
- Strict mode enabled in all `tsconfig.json` files
- No implicit any
- Strict null checks

### Conventions
1. **Naming:**
   - Files: kebab-case (e.g., `subscriptions.controller.ts`)
   - Classes: PascalCase (e.g., `SubscriptionsController`)
   - Variables/functions: camelCase (e.g., `getUserSubscriptions`)
   - Constants: UPPER_SNAKE_CASE (e.g., `MAX_RETRIES`)

2. **Module Organization:**
   - Each feature in its own module
   - Services contain business logic
   - Controllers handle HTTP
   - DTOs define interfaces

3. **Testing:**
   - Test files next to source: `*.spec.ts`
   - Descriptive test names
   - Arrange-Act-Assert pattern

## Common Tasks for Agents

### Adding a New API Endpoint

1. Create/update DTO in `packages/shared-dtos/`
2. Add controller method in `apps/backend/src/modules/[module]/[module].controller.ts`
3. Add service method in `apps/backend/src/modules/[module]/[module].service.ts`
4. Add Swagger decorators to controller
5. Write integration test in `apps/backend/tests/integration/`
6. Ensure 90% coverage maintained

### Adding a New Frontend Page

1. Create component in `apps/frontend/src/pages/`
2. Create styled components in `.styled.ts` file
3. Add React Query hooks in `apps/frontend/src/queries/`
4. Update router in `apps/frontend/src/router/`
5. Write tests with React Testing Library
6. Ensure responsive design (mobile, tablet, desktop)

### Database Schema Changes

1. Update `apps/backend/prisma/schema.prisma`
2. Run `npx prisma migrate dev --name descriptive-migration-name`
3. Update related DTOs in `packages/shared-dtos/`
4. Update services using the changed models
5. Update tests
6. Rebuild shared DTOs: `npm run build:dtos`

### Adding Dependencies

```bash
# Root level (for tooling)
npm install -D <package>

# Specific app
npm install --workspace=apps/backend <package>
npm install --workspace=apps/frontend <package>

# Shared package
npm install --workspace=packages/shared-dtos <package>
```

## Performance Considerations

1. **Money as Cents**: All monetary values stored as integers (cents) for precision
2. **Database Indexing**: Email is unique indexed, foreign keys indexed
3. **Soft Deletes**: Subscriptions use `deletedAt` instead of hard deletes
4. **React Memoization**: Complex calculations memoized
5. **Code Splitting**: React lazy loading for routes
6. **Image Optimization**: Next.js Image component for landing page

## Debugging

### Backend Logs
- Winston logger configured per environment
- Logs location: `apps/backend/logs/`
- No sensitive data in logs (IDs only)

### Frontend Debug
- React DevTools
- TanStack Query DevTools (enabled in development)
- Zustand DevTools

### Database Debug
```bash
# Open Prisma Studio
cd apps/backend
npx prisma studio
```

## Known Patterns

1. **Demo User Support**: Swagger docs can run requests as demo user
2. **Theme Persistence**: Theme state shared between landing and app via cookies
3. **Responsive Forms**: Form elements auto-adjust size on mobile
4. **Loading States**: Skeletons used instead of spinners
5. **Error Boundary**: BugSnag integration for error tracking

## Important Notes for Agents

1. **Always rebuild shared DTOs** after changes: `npm run build:dtos`
2. **Database migrations are required** for schema changes
3. **90% test coverage** is enforced on backend
4. **No circular dependencies** in NestJS modules
5. **Money must be in cents** (integer), never floats
6. **Dates are stored as Date type** in database (no time component for subscription dates)
7. **Soft deletes** for subscriptions (set `deletedAt`, don't actually delete)
8. **Validation pipe filters requests** - extra fields are removed
9. **Transformer service filters responses** - sensitive fields removed
10. **Use enums** from Prisma schema, don't create duplicate string unions

## Getting Help

- **README.md**: User-facing documentation
- **Swagger Docs**: [https://backend-u7jt.onrender.com/api/](https://backend-u7jt.onrender.com/api/)
- **Prisma Schema**: `/apps/backend/prisma/schema.prisma`
- **Test Examples**: See `apps/backend/tests/integration/` for patterns

## Project Philosophy

This project emphasizes:
- **Type Safety**: TypeScript strict mode everywhere
- **Testing**: Integration tests over unit tests (Testing Trophy)
- **Security**: Input validation, output filtering, secure authentication
- **Performance**: Optimized rendering, efficient queries, proper indexing
- **Maintainability**: Clear structure, no circular dependencies, comprehensive docs
- **Developer Experience**: Good tooling, clear conventions, automated checks
- **Production Ready**: CI/CD, monitoring, logging, error tracking

---

*Last Updated: December 2025*
*Repository: https://github.com/loburets/SubControl*
