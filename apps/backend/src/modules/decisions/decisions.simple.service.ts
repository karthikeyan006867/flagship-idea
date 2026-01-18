import { Injectable } from '@nestjs/common';
import { CreateDecisionInput } from './dto/create-decision.input';
import { UpdateDecisionInput } from './dto/update-decision.input';
import { Decision, DecisionCategory } from './entities/decision.entity';

// In-memory storage - sample data
const decisionsStore: Decision[] = [
  {
    id: '1',
    title: 'Transition to Remote Work Model',
    description: 'Evaluating the decision to move our entire team to a remote-first working model',
    category: DecisionCategory.CAREER,
    context: {
      age: 32,
      location: 'San Francisco, CA',
      economicCondition: 'stable'
    },
    confidence: 85,
    risk: 35,
    alternatives: ['Hybrid model (3 days office)', 'Stay fully in-office', 'Flexible per team'],
    outcomes: [],
    userId: 'demo-user',
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15')
  } as Decision,
  {
    id: '2',
    title: 'Cryptocurrency Investment Strategy',
    description: 'Deciding whether to allocate 15% of savings into cryptocurrency portfolio',
    category: DecisionCategory.FINANCIAL,
    context: {
      age: 28,
      location: 'New York, NY',
      economicCondition: 'volatile'
    },
    confidence: 60,
    risk: 85,
    alternatives: ['Traditional index funds', 'Real estate investment', 'High-yield savings'],
    outcomes: [],
    userId: 'demo-user',
    createdAt: new Date('2024-02-10'),
    updatedAt: new Date('2024-02-10')
  } as Decision,
  {
    id: '3',
    title: 'Career Pivot to AI/ML Engineering',
    description: 'Considering a career change from full-stack development to AI/ML specialization',
    category: DecisionCategory.CAREER,
    context: {
      age: 35,
      location: 'Austin, TX',
      economicCondition: 'growing'
    },
    confidence: 70,
    risk: 55,
    alternatives: ['Stay in current role', 'Pursue hybrid role', 'Part-time upskilling first'],
    outcomes: [],
    userId: 'demo-user',
    createdAt: new Date('2024-03-05'),
    updatedAt: new Date('2024-03-05')
  } as Decision
];

@Injectable()
export class DecisionsService {
  async create(createDecisionInput: CreateDecisionInput, userId = 'demo-user'): Promise<Decision> {
    const decision: Decision = {
      id: String(decisionsStore.length + 1),
      ...createDecisionInput,
      userId,
      outcomes: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    decisionsStore.push(decision);
    return decision;
  }

  async findAll(): Promise<Decision[]> {
    return decisionsStore.sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }

  async findOne(id: string): Promise<Decision | null> {
    return decisionsStore.find(d => d.id === id) || null;
  }

  async findByUser(userId: string): Promise<Decision[]> {
    return decisionsStore
      .filter(d => d.userId === userId)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  async update(id: string, updateDecisionInput: UpdateDecisionInput): Promise<Decision | null> {
    const index = decisionsStore.findIndex(d => d.id === id);
    if (index === -1) return null;
    
    decisionsStore[index] = {
      ...decisionsStore[index],
      ...updateDecisionInput,
      updatedAt: new Date(),
    };
    return decisionsStore[index];
  }

  async remove(id: string): Promise<boolean> {
    const index = decisionsStore.findIndex(d => d.id === id);
    if (index === -1) return false;
    
    decisionsStore.splice(index, 1);
    return true;
  }

  // Analytics
  async getStats() {
    const decisions = decisionsStore;
    const byCategory: Record<string, number> = {};
    
    decisions.forEach(d => {
      byCategory[d.category] = (byCategory[d.category] || 0) + 1;
    });

    return {
      total: decisions.length,
      byCategory,
      avgConfidence: decisions.reduce((sum, d) => sum + d.confidence, 0) / decisions.length || 0,
      avgRisk: decisions.reduce((sum, d) => sum + d.risk, 0) / decisions.length || 0,
    };
  }
}
