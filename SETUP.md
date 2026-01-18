# HDIP - Setup & Development Guide

## 🏗️ Project Structure

```
flagship idea/
├── apps/
│   ├── frontend/          # React + TypeScript + Tailwind
│   └── backend/           # NestJS + GraphQL + PostgreSQL
├── packages/              # Shared packages (future)
├── .env.example          # Environment variables template
└── package.json          # Root workspace config
```

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** >= 18.0.0
- **npm** >= 9.0.0
- **PostgreSQL** >= 14.0
- **Redis** >= 7.0 (optional, for caching)

## 🚀 Quick Start

### 1. Clone and Install

```bash
# Navigate to project directory
cd "c:\Users\kaart\.vscode\projects\flagship idea"

# Install all dependencies
npm install
```

### 2. Environment Setup

```bash
# Copy environment template
cp .env.example .env

# Edit .env file with your configuration
# Required: DATABASE_URL, AUTH0 credentials
```

### 3. Database Setup

```bash
# Create PostgreSQL database
createdb hdip_development

# Or using psql
psql -U postgres
CREATE DATABASE hdip_development;
\q
```

Update your `.env` file:

```env
DATABASE_URL=postgresql://postgres:password@localhost:5432/hdip_development
```

### 4. Run Development Servers

```bash
# Run both frontend and backend
npm run dev

# Or run separately:
npm run dev:frontend    # Frontend on http://localhost:3000
npm run dev:backend     # Backend on http://localhost:4000
```

## 🎨 Frontend Development

### Tech Stack

- **React 18** with TypeScript
- **Vite** for blazing fast builds
- **Tailwind CSS** for styling
- **Framer Motion** for animations
- **D3.js** for data visualizations
- **Apollo Client** for GraphQL
- **Auth0** for authentication

### Key Features Implemented

✅ Enterprise dark mode design system
✅ Command-center dashboard layout
✅ Glassmorphism UI components
✅ Responsive navigation with sidebar
✅ Decision capture form with sliders
✅ Command palette (⌘K / Ctrl+K)
✅ Loading screens and animations

### Typography System

- **Headings**: IBM Plex Sans
- **Body**: Inter
- **Code/Data**: JetBrains Mono

### Color Palette

- **Primary**: Blue (#0069FF)
- **Backgrounds**: Dark grays (#0A0E1A, #0F1420)
- **Accents**: Blue, Purple, Cyan, Green, Amber, Red

### Running Frontend

```bash
cd apps/frontend

# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🔧 Backend Development

### Tech Stack

- **NestJS** framework
- **GraphQL** API with Apollo
- **TypeORM** for database
- **PostgreSQL** database
- **JWT** authentication
- **Class Validator** for input validation

### Modules Implemented

✅ Decisions Module (CRUD operations)
✅ Outcomes Module (tracking results)
✅ Users Module (user management)
✅ Auth Module (authentication)
✅ Analytics Module (data analysis)

### Database Schema

**Users Table**

- id, email, name, passwordHash, role, profile
- Roles: user, researcher, admin, government, corporate

**Decisions Table**

- id, title, category, description, confidence, risk
- alternatives, context (JSONB)
- Relations: user, outcomes

**Outcomes Table**

- id, decisionId, status, satisfactionScore
- description, milestones, metrics (JSONB)
- recordedAt, createdAt, updatedAt

### GraphQL Endpoints

Access GraphQL Playground at: `http://localhost:4000/graphql`

**Queries:**

```graphql
query {
  decisions {
    id
    title
    category
    confidence
    risk
  }
}

query {
  user(id: "uuid") {
    id
    name
    email
    decisions {
      id
      title
    }
  }
}
```

**Mutations:**

```graphql
mutation {
  createDecision(
    createDecisionInput: {
      title: "Career Change"
      category: CAREER
      description: "Switching to product management"
      confidence: 75
      risk: 40
      userId: "user-uuid"
    }
  ) {
    id
    title
  }
}
```

### Running Backend

```bash
cd apps/backend

# Install dependencies
npm install

# Start dev server with hot reload
npm run dev

# Build for production
npm run build

# Start production server
npm run start:prod
```

## 🔌 API Integration Setup

### Auth0 Configuration

1. Create Auth0 account at https://auth0.com
2. Create new application (Single Page Application)
3. Configure callback URLs:
   - Allowed Callback URLs: `http://localhost:3000`
   - Allowed Logout URLs: `http://localhost:3000`
   - Allowed Web Origins: `http://localhost:3000`
4. Add credentials to `.env`:

```env
VITE_AUTH0_DOMAIN=your-domain.auth0.com
VITE_AUTH0_CLIENT_ID=your_client_id
```

### Mapbox Setup

1. Sign up at https://www.mapbox.com
2. Get access token from dashboard
3. Add to `.env`:

```env
VITE_MAPBOX_TOKEN=pk.your_mapbox_token
```

### Stripe Setup

1. Create Stripe account at https://stripe.com
2. Get API keys from dashboard
3. Add to `.env`:

```env
STRIPE_SECRET_KEY=sk_test_your_key
STRIPE_PUBLIC_KEY=pk_test_your_key
```

## 🧪 Testing

```bash
# Run tests for all workspaces
npm test

# Frontend tests
cd apps/frontend
npm test

# Backend tests
cd apps/backend
npm test
npm run test:cov  # with coverage
```

## 📦 Building for Production

```bash
# Build all workspaces
npm run build

# Build frontend only
npm run build --workspace=apps/frontend

# Build backend only
npm run build --workspace=apps/backend
```

## 🎯 Next Steps

### Phase 1: Core Features (Current)

✅ Project setup and configuration
✅ Design system implementation
✅ Basic UI components and layout
✅ Database schema and models
✅ GraphQL API foundation

### Phase 2: Advanced Features

- [ ] Complete decision capture workflow
- [ ] Timeline visualization with D3.js
- [ ] Comparative intelligence analytics
- [ ] Simulation lab with scenario branching
- [ ] Institutional dashboards

### Phase 3: Data & Analytics

- [ ] BigQuery integration for analytics
- [ ] ElasticSearch for fast querying
- [ ] Real-time updates with Redis
- [ ] Advanced data visualizations
- [ ] Export and reporting features

### Phase 4: Enterprise Features

- [ ] Multi-tenant architecture
- [ ] Role-based access control
- [ ] Audit logging system
- [ ] Data anonymization
- [ ] API rate limiting
- [ ] Enterprise SSO integration

## 🐛 Troubleshooting

### Common Issues

**Port already in use:**

```bash
# Kill process on port 3000 or 4000
npx kill-port 3000
npx kill-port 4000
```

**Database connection error:**

- Ensure PostgreSQL is running
- Check DATABASE_URL in .env
- Verify database exists

**Module not found:**

```bash
# Clear node_modules and reinstall
rm -rf node_modules
npm install
```

## 📚 Resources

- [NestJS Documentation](https://docs.nestjs.com)
- [React Documentation](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [GraphQL Documentation](https://graphql.org)
- [TypeORM Documentation](https://typeorm.io)

## 🤝 Development Workflow

1. Create feature branch: `git checkout -b feature/your-feature`
2. Make changes and test locally
3. Commit with descriptive message
4. Push and create pull request
5. Code review and merge

## 📄 License

Proprietary - All rights reserved
