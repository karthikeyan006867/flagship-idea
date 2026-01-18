# HDIP - Technical Architecture Document

## 🏛️ System Architecture

### High-Level Overview

```
┌─────────────────────────────────────────────────────────────┐
│                      Client Layer                           │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │   Web App    │  │  Mobile App  │  │  Admin Panel │     │
│  │  (React)     │  │  (Future)    │  │   (React)    │     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
└─────────────────────────────────────────────────────────────┘
                            │
                            │ HTTPS / GraphQL
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                    API Gateway / BFF                        │
│                     (NestJS + GraphQL)                      │
└─────────────────────────────────────────────────────────────┘
                            │
        ┌───────────────────┼───────────────────┐
        ▼                   ▼                   ▼
┌──────────────┐  ┌──────────────┐  ┌──────────────┐
│  Decisions   │  │   Outcomes   │  │  Analytics   │
│  Service     │  │   Service    │  │   Service    │
└──────────────┘  └──────────────┘  └──────────────┘
        │                   │                   │
        └───────────────────┼───────────────────┘
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                     Data Layer                              │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │ PostgreSQL   │  │  BigQuery    │  │    Redis     │     │
│  │ (Core Data)  │  │ (Analytics)  │  │  (Caching)   │     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
└─────────────────────────────────────────────────────────────┘
```

## 🎯 Core Modules Architecture

### 1. Decision Capture Engine

**Purpose**: Structured logging of decisions with full context

**Components**:

- Decision Form UI (React)
- Context Tagging System
- Confidence & Risk Sliders
- Alternative Options Manager
- Decision Validator

**Data Flow**:

```
User Input → Validation → Transform → GraphQL Mutation →
Database → Response → UI Update
```

**Database Model**:

```typescript
Decision {
  id: UUID
  title: string
  category: enum(career, business, policy, personal)
  description: text
  confidence: integer (0-100)
  risk: integer (0-100)
  alternatives: string[]
  context: jsonb {
    age: string
    region: string
    economicStatus: string
    culturalContext: string
    timeframe: string
  }
  userId: UUID (foreign key)
  createdAt: timestamp
  updatedAt: timestamp
}
```

### 2. Timeline Outcome Engine

**Purpose**: Track decision outcomes over time

**Components**:

- Timeline Visualization (D3.js)
- Milestone Tracker
- Progress Indicators
- Outcome Recorder
- Comparison Tools

**Data Flow**:

```
Decision → Time Passes → Outcome Records →
Milestone Tracking → Timeline Visualization
```

**Database Model**:

```typescript
Outcome {
  id: UUID
  decisionId: UUID (foreign key)
  status: enum(pending, in_progress, success, failure, mixed)
  satisfactionScore: integer (1-10)
  description: text
  milestones: string[]
  metrics: jsonb {
    financialImpact: number
    timeInvestment: number
    emotionalWellbeing: number
    careerProgress: number
  }
  recordedAt: timestamp
  createdAt: timestamp
}
```

### 3. Comparative Intelligence

**Purpose**: Compare decisions across regions, cultures, demographics

**Components**:

- Similarity Engine
- Regional Comparison Tool
- Cultural Analysis Module
- Decision Clustering Algorithm
- Outcome Prediction Model

**Algorithms**:

- K-Nearest Neighbors for similar decisions
- Demographic matching
- Cultural context weighting
- Time-period normalization

**API Endpoints**:

```graphql
query {
  similarDecisions(
    decisionId: ID!
    filters: {
      region: String
      ageRange: String
      category: DecisionCategory
    }
    limit: Int
  ) {
    decision {
      id
      title
      confidence
    }
    similarity: Float
    outcomes {
      status
      satisfactionScore
    }
  }
}
```

### 4. Simulation Lab

**Purpose**: "What if" scenario modeling

**Components**:

- Scenario Builder
- Multi-path Decision Tree
- Probability Cone Visualization
- Risk Assessment Engine
- Monte Carlo Simulator

**Features**:

- Branch creation for alternatives
- Probability distribution modeling
- Risk vs. reward analysis
- Long-term projection
- Confidence intervals

**Visualization**:

- Sankey diagrams for flow
- Decision trees with probabilities
- Outcome probability cones
- Timeline scrubbing

### 5. Institutional Dashboards

**Purpose**: Specialized views for different stakeholders

**Dashboard Types**:

**Government View**:

- Policy impact analysis
- Regional decision patterns
- Demographic insights
- Long-term outcome trends
- Public vs private sector comparisons

**Corporate View**:

- Employee decision analytics
- Career path optimization
- Retention risk analysis
- Skills development tracking
- ROI on training decisions

**Research View**:

- Data export capabilities
- Statistical analysis tools
- Cohort comparison
- Longitudinal studies
- Publication-ready visualizations

## 🔐 Security Architecture

### Authentication & Authorization

**Auth0 Integration**:

```typescript
// JWT Token Structure
{
  sub: "user_id",
  email: "user@example.com",
  role: "researcher | admin | government | corporate",
  permissions: ["read:decisions", "write:decisions", "admin:analytics"],
  exp: timestamp
}
```

**Authorization Levels**:

- **User**: Own decisions only
- **Researcher**: Anonymized aggregate data
- **Corporate**: Organization data
- **Government**: Regional aggregate data
- **Admin**: Full access

### Data Privacy

**Anonymization Pipeline**:

1. Remove PII (names, emails, specific locations)
2. Aggregate demographics into ranges
3. Hash user identifiers
4. Remove outlier data points
5. Apply differential privacy for statistics

**Audit Logging**:

```typescript
AuditLog {
  id: UUID
  userId: UUID
  action: string
  resource: string
  timestamp: timestamp
  ipAddress: string (hashed)
  metadata: jsonb
}
```

## 📊 Data Analytics Architecture

### BigQuery Integration

**Data Pipeline**:

```
PostgreSQL → ETL Process → BigQuery →
Analytics Queries → Cache → API Response
```

**Scheduled Jobs**:

- Daily aggregation (midnight)
- Weekly trends calculation
- Monthly reports generation
- Quarterly longitudinal analysis

**Sample Analytics Queries**:

```sql
-- Success rate by category
SELECT
  category,
  COUNT(*) as total_decisions,
  AVG(outcome.satisfactionScore) as avg_satisfaction,
  COUNT(CASE WHEN outcome.status = 'success' THEN 1 END) / COUNT(*) as success_rate
FROM decisions
JOIN outcomes ON decisions.id = outcomes.decisionId
GROUP BY category;
```

### ElasticSearch for Fast Querying

**Indexed Fields**:

- Decision title (full-text)
- Description (full-text)
- Category (keyword)
- Context metadata (nested)
- User demographics (keyword)

**Search Capabilities**:

- Full-text search
- Fuzzy matching
- Faceted filtering
- Autocomplete
- Relevance ranking

## 🔌 External API Integrations

### Mapbox

**Use Case**: Spatial decision mapping

```typescript
// Display decisions on world map
const heatmapLayer = {
  type: "heatmap",
  data: decisions.map((d) => ({
    coordinates: [d.context.longitude, d.context.latitude],
    intensity: d.confidence,
  })),
};
```

### Stripe

**Use Case**: Monetization

- Subscription tiers
- Research access fees
- Enterprise licenses
- API usage billing

### Cloud Vision/NLP

**Use Case**: Document processing

- Upload decision documents
- Extract key information
- Sentiment analysis
- Entity recognition

## 🚀 Performance Optimization

### Caching Strategy

**Redis Layers**:

1. **API Response Cache** (5 min TTL)
2. **Query Result Cache** (15 min TTL)
3. **Session Store** (24 hour TTL)
4. **Rate Limiting** (per-minute counters)

### Database Optimization

**Indexes**:

```sql
CREATE INDEX idx_decisions_user_id ON decisions(userId);
CREATE INDEX idx_decisions_category ON decisions(category);
CREATE INDEX idx_decisions_created_at ON decisions(createdAt);
CREATE INDEX idx_outcomes_decision_id ON outcomes(decisionId);
CREATE INDEX idx_outcomes_recorded_at ON outcomes(recordedAt);
```

**Partitioning**:

- Partition decisions by year
- Partition outcomes by quarter
- Archive old data to BigQuery

## 📈 Scalability Plan

### Horizontal Scaling

- Load balancer (Nginx)
- Multiple NestJS instances
- Database read replicas
- Redis cluster

### Microservices Migration Path

1. Extract analytics service
2. Extract simulation service
3. Extract notification service
4. API Gateway pattern

## 🧪 Testing Strategy

### Unit Tests

- Service layer logic
- Resolver functions
- Utility functions
- Validators

### Integration Tests

- GraphQL API endpoints
- Database operations
- External API integrations

### E2E Tests

- Critical user flows
- Decision capture
- Outcome tracking
- Dashboard interactions

## 📊 Monitoring & Observability

### Metrics

- API response times
- Database query performance
- Error rates
- User engagement
- Decision creation rate

### Logging

- Structured JSON logs
- Log levels (error, warn, info, debug)
- Correlation IDs for tracing
- Log aggregation (ELK stack)

### Alerting

- Error rate thresholds
- Response time degradation
- Database connection issues
- Failed external API calls
