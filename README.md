# SubControl – Subscription Tracking App

This project showcases my expertise in modern frontend and backend technologies, with a focus on best practices.

## 📌 Features

- ✍️ **Track Subscriptions** – Add and manage services like Netflix, Apple Music, etc.
- 📅 **Payments Calendar** – Stay informed about your next charges.
- 📊 **Spending Insights** – View detailed statistics on past and future expenses.
- 🎨 **Dark & Light Mode** – Automatically adapts to your system theme.
- 📱 **Mobile-Friendly Design** – Fully responsive UI from 320px mobile to 4K screens.

---

## 🛠️ Tech Stack

### **Backend**
- **NestJS** – Node.js framework.
- **TypeScript** – Strictly typed JavaScript.
- **PostgreSQL** – Relational database.
- **Prisma ORM** – Type-safe queries and data scheme support.
- **Docker** – Local database containerization.
- **BugSnag** – Error tracking.

### **Frontend**
- **React** – Modern frontend framework.
- **TypeScript** – Static typing for better developer experience.
- **Ant Design** – UI component library for a polished UI + form management.
- **Styled Components** – A way to organize styling.
- **TanStack React Query** – Efficient data fetching and caching.
- **Zustand** – Lightweight state management.

### **Landing Page**
- **Next.js** – SSR for fast-loading seo-friendly pages based on React and with Typescript
- **Mantine** – UI components optimized for server-side rendering.

---

## ✅ Best Practices & Highlights

### **Common**

- 📏 **Code Formatting & Linting** – Ensured with [ESLint](.eslintrc.js) and [Prettier](.prettierrc).
- 📦 **Monorepo** – Structured using [npm workspaces](package.json).
- 🔢 **Node.js Version** – Defined in [.nvmrc](.nvmrc) for consistency.


### **Backend**
- 🚀 **Shared DTOs** – Consistent [request/response structures](packages/shared-dtos) across frontend & backend.
- 🧪 **Integration Tests** – Covers controllers and runs in parallel.
- 🏆 **The Testing Trophy** – instead of the testing pyramid [(the tests are here)](apps/backend/tests)
-  **Database Migrations** – [DB Migration](apps/backend/prisma/migrations) for consistency across envs and proper CD
- 🔒 **Secure API** – [Filters](apps/backend/src/main.ts) redundant fields in requests to prevent injections. And DTOs for responses [to not expose sensitive fields](apps/backend/src/modules/transformers/transformers.service.ts)
-  **Enums where applicable** – for DB/Prisma and in Request/Responses types ([example](packages/shared-dtos/src/subscriptions/requests.dto.ts))
-  **Swagger API Docs** – Auto-generated with [ts decorators](apps/backend/src/modules/subscriptions/subscriptions.controller.ts). The documentation can [run requests on behalf of a test user](apps/backend/src/utils/swagger.ts)
- 💾 **Money Storage** – Money stored as cents (integer format) for precision.
- 📜 **Logging** – Winston logger with environment-specific  [transports](apps/backend/src/config/winston-logger.config.ts)
- **Meaningful logs** - No sensitive data in logs, only ids
- **BugSnag integration** – Sentry alternative for errors tracking
- 🔄 **No circular dependencies** – due to [Nest Modules](apps/backend/src/modules/subscriptions/subscriptions.module.ts)

### **Frontend**
- 🎛 **Custom Hooks** – Extracted reusable logic for maintainability.
- 🌙 **Dynamic Theming** – Switch between dark/light modes automatically.
- 📱 **Fully Responsive** – Optimized for mobile, tablet, and desktop.
- 🔍 **Memoization** – Optimized performance for complex UI calculations.
- 🧩 **Component-Based Architecture** – Modular and scalable UI design.

### **Landing Page**
- 🎨 **Consistent Styling** – Matches the main app for a unified experience.
- 🖼️ **Dynamic Screenshots** – Landing page adapts its theme to match the app.
- ⚡ **Hybrid Rendering** – Static content pre-rendered, dynamic content client-rendered.

---

## 📸 Screenshots




## Frontend


### Some good practices:

- React Hooks for reusable parts [(example)][apps/frontend/src/hooks/useDemo.ts]
- [Light/Dark theme with dynamic changing](apps/frontend/src/store/themeSwitcher.store.ts) and default value from the device
- [Tokens in styles](apps/frontend/src/components/Layout/Layout.styled.ts)
- Responsive design from 320px to 4k
- [Zustand](apps/frontend/src/store) for global states instead of context
- React testing library for integration tests ([example](apps/frontend/src/pages/Login.test.tsx))
- Skeletons for loading states
- Memoization for complex calculations like sorting during rendering
- No special Form manager as Ant Design Form is enough ([example](apps/frontend/src/components/UI/SubscriptionForm.tsx))
- Form elements [are bigger](apps/frontend/src/components/UI/FormElementsAdjuster.tsx) on mobile for easier touch


## Landing

### Technologies

- TypeScript
- React
- Next.js
- Mantine as components library (Ant Design is not good with SSR)

### Some good practices:

- Light/dark theme state [is shared](apps/landing/src/components/ThemeSwitcher.tsx) with main app
- The theme on screenshots of the app [is changed](apps/landing/src/components/Image.tsx) together with the theme on the Landing
- Dynamic components are rendered ond client-side  [(example)](apps/landing/src/components/ThemeSwitcher.tsx), but static content is pre-rendered
- The same [colors](apps/landing/src/app/layout.tsx) and fonts as in the main app

## How it looks

I'm not sure for how long the app will be available, so I've made screenshots of it

### The landing page

![](apps/landing/public/screenshots/landing.png)

![](apps/landing/public/screenshots/landing-2.png)

### Or the dark version

![](apps/landing/public/screenshots/landing-dark.png)

![](apps/landing/public/screenshots/landing-2-dark.png)

### Mobile versions are also included

<p align="center">
  <img src="apps/landing/public/screenshots/landing-mobile.png" width="35%" style="margin-right: 10%;"/>
  <span>&nbsp;&nbsp;&nbsp;</span>
  <img src="apps/landing/public/screenshots/landing-mobile-dark.png" width="35%" />
</p>

### The app

![main.png](apps/landing/public/screenshots/main.png)

![stats.png](apps/landing/public/screenshots/stats.png)

![upcoming-payments-dark.png](apps/landing/public/screenshots/upcoming-payments-dark.png)

### Mobile width

<p align="center">
  <img src="apps/landing/public/screenshots/subscription-mobile.png" width="35%" style="margin-right: 10%;"/>
  <span>&nbsp;&nbsp;&nbsp;</span>
  <img src="apps/landing/public/screenshots/edit-subscription-mobile.png" width="35%" style="margin-right: 10%;"/>
</p>
