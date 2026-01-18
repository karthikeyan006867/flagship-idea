export interface Decision {
  id: string;
  title: string;
  category: 'career' | 'business' | 'policy' | 'personal';
  description: string;
  confidence: number;
  risk: number;
  alternatives: string[];
  context: DecisionContext;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface DecisionContext {
  age?: string;
  region?: string;
  economicStatus?: string;
  culturalContext?: string;
  timeframe?: string;
  [key: string]: any;
}

export interface Outcome {
  id: string;
  decisionId: string;
  status: 'pending' | 'in_progress' | 'success' | 'failure' | 'mixed';
  satisfactionScore: number;
  description: string;
  milestones: string[];
  metrics: OutcomeMetrics;
  recordedAt: Date;
  createdAt: Date;
}

export interface OutcomeMetrics {
  financialImpact?: number;
  timeInvestment?: number;
  emotionalWellbeing?: number;
  careerProgress?: number;
  [key: string]: any;
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'user' | 'researcher' | 'admin' | 'government' | 'corporate';
  profile?: UserProfile;
  createdAt: Date;
}

export interface UserProfile {
  organization?: string;
  position?: string;
  interests?: string[];
  [key: string]: any;
}
