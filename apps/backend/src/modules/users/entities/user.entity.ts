import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from "typeorm";
import { ObjectType, Field, ID } from "@nestjs/graphql";
import { Decision } from "../../decisions/entities/decision.entity";

export enum UserRole {
  USER = "user",
  RESEARCHER = "researcher",
  ADMIN = "admin",
  GOVERNMENT = "government",
  CORPORATE = "corporate",
}

@ObjectType()
@Entity("users")
export class User {
  @Field(() => ID)
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Field()
  @Column({ unique: true })
  email: string;

  @Field()
  @Column()
  name: string;

  @Column()
  passwordHash: string;

  @Field(() => String)
  @Column({ type: "enum", enum: UserRole, default: UserRole.USER })
  role: UserRole;

  @Field(() => String, { nullable: true })
  @Column("jsonb", { nullable: true })
  profile: Record<string, any>;

  @Field(() => [Decision], { nullable: true })
  @OneToMany(() => Decision, (decision) => decision.user)
  decisions: Decision[];

  @Field()
  @CreateDateColumn()
  createdAt: Date;

  @Field()
  @UpdateDateColumn()
  updatedAt: Date;
}
