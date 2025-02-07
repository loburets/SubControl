# SubControl – Subscription Tracking App

This project showcases my expertise in modern frontend and backend technologies together with some self-discipline to implement best practices.

## 📌 Features

- ✍️ **Track Subscriptions** – Easily add and manage recurring services (e.g., Netflix, Spotify, Apple Music).
- 📅 **Payments Calendar** – Stay informed about your next charges.
- 📊 **Spending Charts** – Gain insights into your past and upcoming expenses.
- 🎨 **Dark & Light Mode** – Automatically adapts to your system theme.
- 📱 **Mobile-Friendly Design** – Fully responsive UI from 320px mobile to 4K screens.

---

## 🛠️ Tech Stack

### **Backend**
- **NestJS** – Node.js framework.
- **TypeScript** – Strictly typed JavaScript.
- **PostgreSQL** – Relational database.
- **Prisma ORM** – Data scheme based: type-safe queries, migrations.
- **Docker** – Local database containerization.
- **BugSnag** – Error tracking.

### **Frontend**
- **React** – Modern frontend framework.
- **TypeScript** – Static typing for better developer experience.
- **Ant Design** – UI component library for a polished UI + form management.
- **Styled Components** – A way to organize styling.
- **TanStack React Query** – Efficient data fetching and caching.
- **Zustand** – Minimalistic state management.

### **Landing Page**
- **Next.js** – React framework with server-side rendering (SSR) and static site generation (SSG) for SEO-friendly, fast-loading pages, TypeScript included.
- **Mantine** – UI components optimized for SSR.

---

## ✅ Best Practices & Highlights

### **Common**
- 📏 **Code Formatting & Linting** – Ensured with [ESLint](.eslintrc.js) and [Prettier](.prettierrc).
- 📦 **Monorepo** – Great for small projects, structured using [npm workspaces](package.json).
- 🔢 **Node.js Version** – Defined in [.nvmrc](.nvmrc) for consistency.
- 📝 **TypeScript Strict Mode** – Enabled for better code quality.
- 📚 **CI/CD** – GitHub [workflows](.github/workflows) for linting, testing, and deployment.

### **Backend**
- 🚀 **Shared DTOs** – Consistent [request/response structures](packages/shared-dtos) across frontend & backend.
- 🧪 **Integration Tests** – Covers controllers and runs in parallel.
- 🏆 **The Testing Trophy** – Instead of the testing pyramid [(the tests are here)](apps/backend/tests).
- 🔄 **Database Migrations** – [DB Migration](apps/backend/prisma/migrations) for consistency across environments and proper CD.
- 🔒 **Secure API** – [Filters](apps/backend/src/main.ts) redundant fields in requests to prevent injections. [Filters](apps/backend/src/modules/transformers/transformers.service.ts) responses per DTOs to avoid exposing sensitive fields.
- 📌 **Enums Where Applicable** – Used for DB/Prisma data structures and in Request/Response types ([example](packages/shared-dtos/src/subscriptions/requests.dto.ts)).
- 📖 **Swagger API Docs** – Auto-generated with [TS decorators](apps/backend/src/modules/subscriptions/subscriptions.controller.ts). The documentation can [run requests on behalf of a test user](apps/backend/src/utils/swagger.ts).
- 💰 **Money Storage** – Stored as cents (integer format) for precision.
- 📜 **Logging** – Winston logger with environment-specific [transports](apps/backend/src/config/winston-logger.config.ts).
- 🔍 **Meaningful Logs** – No sensitive data in logs, only IDs.
- 🛠️ **BugSnag Integration** – Sentry alternative for error tracking.
- 🔄 **No Circular Dependencies** – Proper NestJS module structure prevents circular dependencies [(example)](apps/backend/src/modules/subscriptions/subscriptions.module.ts).

### **Frontend**
- 🎛 **Custom Hooks** – Extracted reusable logic [(example)](apps/frontend/src/hooks/useDemo.ts).
- 🌙 **Dynamic Theming** – Switch between dark/light modes [automatically or manually](apps/frontend/src/store/themeSwitcher.store.ts).
- 🎨 **Consistent Styling** – Uses **design tokens** for unified theming [(example)](apps/frontend/src/components/Layout/Layout.styled.ts).
- 📱 **Fully Responsive** – Optimized for small mobile, tablet, and desktop. Form elements [are larger](apps/frontend/src/components/UI/FormElementsAdjuster.tsx) on mobile for easier interaction.
- 🧪 **React Testing Library** – Used for integration tests [(example)](apps/frontend/src/pages/Login.test.tsx).
- ⚡ **Performance Optimization** – **Memoization** for complex UI calculations to boost performance.
- ⏳ **Skeletons & Loading States** – Improve UX with skeleton loaders.
- 🧩 **Simplified Forms** – No need for a dedicated form manager; Ant Design Form is sufficient [(example)](apps/frontend/src/components/UI/SubscriptionForm.tsx).

### **Landing Page**
- 🎨 **Consistent Styling** – [Matches](apps/landing/src/app/layout.tsx) the main app for a unified experience.
- 🌙 **Shared Night Mode** – Theme state [is shared](apps/landing/src/components/ThemeSwitcher.tsx) with the main app.
- 🖼️ **Dynamic Screenshots** – Landing page [adapts screenshot themes](apps/landing/src/components/Image.tsx) to match the app.
- ⚡ **Hybrid Rendering** – Static content pre-rendered, dynamic content client-rendered.

---

## 📸 Screenshots

### Landing Page

| Light Mode | Dark Mode |
|------------|-----------|
| ![](apps/landing/public/screenshots/landing.png) | ![](apps/landing/public/screenshots/landing-dark.png) |
| ![](apps/landing/public/screenshots/landing-2.png) | ![](apps/landing/public/screenshots/landing-2-dark.png) |

### **Mobile Versions**
<p align="center">
  <img src="apps/landing/public/screenshots/landing-mobile.png" width="35%" />
  <span>&nbsp;&nbsp;&nbsp;</span>
  <img src="apps/landing/public/screenshots/landing-mobile-dark.png" width="35%" />
</p>

### **App Interface**

#### Main page

![main.png](apps/landing/public/screenshots/main.png)

#### Stats

![stats.png](apps/landing/public/screenshots/stats.png)

#### Payments

![upcoming-payments-dark.png](apps/landing/public/screenshots/upcoming-payments-dark.png)

#### Mobile version

<p align="center">
  <img src="apps/landing/public/screenshots/subscription-mobile.png" width="35%" style="margin-right: 10%;"/>
  <span>&nbsp;&nbsp;&nbsp;</span>
  <img src="apps/landing/public/screenshots/edit-subscription-mobile.png" width="35%" style="margin-right: 10%;"/>
</p>

---

## 😿 Trade-offs

As a small project, some features are planned for future improvements or skipped:

- 🧪 **E2E Testing** – Playwright tests are planned.
- 📜 **Improved Logging** – Sensitive fields (e.g., name, email, phone number) should be filtered in logs automatically.
- 🔐 **Additional Features** – Social login, email notifications, password reset, and 2FA are potential enhancements.
- 🧩 **More Unit Tests** – Some complex methods still require better test coverage.
- 🛡 **Captcha Protection** – Each demo session creates records in the database, making it an easy target for spam and load creation. Captcha integration may be necessary with growth.
- 📦 **More Shared Logic** – Some components remain app-specific for simplicity [(e.g., ThemeSwitcher)](apps/landing/src/components/ThemeSwitcher.tsx), but more logic could be moved to shared packages.
