import { Injectable } from '@nestjs/common';
import { Outcome, OutcomeStatus } from './entities/outcome.entity';

@Injectable()
export class OutcomesService {
  // In-memory storage for demo purposes
  private outcomesStore: Outcome[] = [
    {
      id: '1',
      decisionId: '1',
      status: OutcomeStatus.SUCCESS,
      satisfactionScore: 85,
      description: 'Successfully transitioned to remote work. Productivity increased by 25%, work-life balance improved significantly.',
      milestones: ['Team onboarding complete', 'Productivity metrics stabilized', '90% employee satisfaction'],
      metrics: {
        productivityChange: '+25%',
        costSavings: '$50,000/year',
        employeeSatisfaction: '90%'
      },
      recordedAt: new Date('2024-06-15'),
      createdAt: new Date('2024-06-15'),
      updatedAt: new Date('2024-06-15'),
    } as Outcome,
    {
      id: '2',
      decisionId: '2',
      status: OutcomeStatus.MIXED,
      satisfactionScore: 60,
      description: 'Crypto investment showed 15% gain in first quarter but experienced 30% volatility.',
      milestones: ['Initial investment executed', 'First quarter review completed', 'Risk assessment updated'],
      metrics: {
        roi: '+15%',
        volatility: '30%',
        holdingPeriod: '3 months'
      },
      recordedAt: new Date('2024-05-20'),
      createdAt: new Date('2024-05-20'),
      updatedAt: new Date('2024-05-20'),
    } as Outcome,
  ];

  async create(outcomeData: Partial<Outcome>): Promise<Outcome> {
    const newOutcome: Outcome = {
      id: (this.outcomesStore.length + 1).toString(),
      ...outcomeData,
      createdAt: new Date(),
      updatedAt: new Date(),
    } as Outcome;
    
    this.outcomesStore.push(newOutcome);
    return newOutcome;
  }

  async findAll(): Promise<Outcome[]> {
    return this.outcomesStore;
  }

  async findByDecision(decisionId: string): Promise<Outcome[]> {
    return this.outcomesStore.filter((o) => o.decisionId === decisionId);
  }

  async findOne(id: string): Promise<Outcome | null> {
    const outcome = this.outcomesStore.find((o) => o.id === id);
    return outcome || null;
  }

  async update(id: string, updateData: Partial<Outcome>): Promise<Outcome | null> {
    const index = this.outcomesStore.findIndex((o) => o.id === id);
    if (index === -1) return null;

    this.outcomesStore[index] = {
      ...this.outcomesStore[index],
      ...updateData,
      updatedAt: new Date(),
    };
    
    return this.outcomesStore[index];
  }

  async remove(id: string): Promise<boolean> {
    const index = this.outcomesStore.findIndex((o) => o.id === id);
    if (index === -1) return false;

    this.outcomesStore.splice(index, 1);
    return true;
  }

  async getAverageSatisfaction(): Promise<number> {
    if (this.outcomesStore.length === 0) return 0;
    const total = this.outcomesStore.reduce((sum, o) => sum + (o.satisfactionScore || 0), 0);
    return total / this.outcomesStore.length;
  }
}
