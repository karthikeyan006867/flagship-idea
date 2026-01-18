import { InputType, Field, Int } from "@nestjs/graphql";
import { IsNotEmpty, IsEnum, IsInt, Min, Max, IsArray } from "class-validator";
import { DecisionCategory } from "../entities/decision.entity";

@InputType()
export class CreateDecisionInput {
  @Field()
  @IsNotEmpty()
  title: string;

  @Field(() => String)
  @IsEnum(DecisionCategory)
  category: DecisionCategory;

  @Field()
  @IsNotEmpty()
  description: string;

  @Field(() => Int)
  @IsInt()
  @Min(0)
  @Max(100)
  confidence: number;

  @Field(() => Int)
  @IsInt()
  @Min(0)
  @Max(100)
  risk: number;

  @Field(() => [String], { nullable: true })
  @IsArray()
  alternatives?: string[];

  @Field(() => String, { nullable: true })
  context?: Record<string, any>;

  @Field()
  @IsNotEmpty()
  userId: string;
}
