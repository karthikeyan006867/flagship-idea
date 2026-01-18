import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { ObjectType, Field, ID, Int } from '@nestjs/graphql';
import { Decision } from '../../decisions/entities/decision.entity';

export enum OutcomeStatus {
  PENDING = 'pending',
  IN_PROGRESS = 'in_progress',
  SUCCESS = 'success',
  FAILURE = 'failure',
  MIXED = 'mixed',
}

@ObjectType()
@Entity('outcomes')
export class Outcome {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column()
  decisionId: string;

  @Field(() => Decision)
  @ManyToOne(() => Decision, (decision) => decision.outcomes)
  decision: Decision;

  @Field(() => String)
  @Column({ type: 'enum', enum: OutcomeStatus })
  status: OutcomeStatus;

  @Field(() => Int)
  @Column('int')
  satisfactionScore: number;

  @Field()
  @Column('text')
  description: string;

  @Field(() => [String], { nullable: true })
  @Column('simple-array', { nullable: true })
  milestones: string[];

  @Field(() => String, { nullable: true })
  @Column('jsonb', { nullable: true })
  metrics: Record<string, any>;

  @Field()
  @Column()
  recordedAt: Date;

  @Field()
  @CreateDateColumn()
  createdAt: Date;

  @Field()
  @UpdateDateColumn()
  updatedAt: Date;
}
