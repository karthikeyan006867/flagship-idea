import { Injectable } from '@nestjs/common';
import { Outcome } from './entities/outcome.entity';

@Injectable()
export class OutcomesService {
  // In-memory storage for demo purposes
  private outcomesStore: Outcome[] = [
    {
      id: '1',
      decisionId: '1',
      actualResult: 'Successfully transitioned to remote work. Productivity increased by 25%, work-life balance improved significantly.',
      dateRecorded: new Date('2024-06-15'),
      successScore: 85,
      lessonsLearned: 'Clear communication protocols and regular virtual team meetings were crucial. Time zone flexibility was a major advantage.',
      createdAt: new Date('2024-06-15'),
      updatedAt: new Date('2024-06-15'),
    },
    {
      id: '2',
      decisionId: '2',
      actualResult: 'Crypto investment showed 15% gain in first quarter but experienced 30% volatility.',
      dateRecorded: new Date('2024-05-20'),
      successScore: 60,
      lessonsLearned: 'Market timing is extremely difficult. Diversification across multiple cryptocurrencies reduced some risk but volatility remained high.',
      createdAt: new Date('2024-05-20'),
      updatedAt: new Date('2024-05-20'),
    },
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

  async findOne(id: string): Promise<Outcome | null> {
    const outcome = this.outcomesStore.find((o) => o.id === id);
    return outcome || null;
  }

  async findByDecision(decisionId: string): Promise<Outcome[]> {
    return this.outcomesStore.filter((o) => o.decisionId === decisionId);
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

  async getAverageSuccess(): Promise<number> {
    if (this.outcomesStore.length === 0) return 0;
    const total = this.outcomesStore.reduce((sum, o) => sum + (o.successScore || 0), 0);
    return total / this.outcomesStore.length;
  }
}
