import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { ObjectType, Field, ID, Int, Float } from "@nestjs/graphql";
import { User } from "../../users/entities/user.entity";
import { Outcome } from "../../outcomes/entities/outcome.entity";

export enum DecisionCategory {
  CAREER = "career",
  BUSINESS = "business",
  POLICY = "policy",
  PERSONAL = "personal",
}

@ObjectType()
@Entity("decisions")
export class Decision {
  @Field(() => ID)
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Field()
  @Column()
  title: string;

  @Field()
  @Column({ type: "enum", enum: DecisionCategory })
  category: DecisionCategory;

  @Field()
  @Column("text")
  description: string;

  @Field(() => Int)
  @Column("int")
  confidence: number;

  @Field(() => Int)
  @Column("int")
  risk: number;

  @Field(() => [String])
  @Column("simple-array", { nullable: true })
  alternatives: string[];

  @Field(() => String, { nullable: true })
  @Column("jsonb", { nullable: true })
  context: Record<string, any>;

  @Field()
  @Column()
  userId: string;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.decisions)
  user: User;

  @Field(() => [Outcome], { nullable: true })
  @OneToMany(() => Outcome, (outcome) => outcome.decision)
  outcomes: Outcome[];

  @Field()
  @CreateDateColumn()
  createdAt: Date;

  @Field()
  @UpdateDateColumn()
  updatedAt: Date;
}
