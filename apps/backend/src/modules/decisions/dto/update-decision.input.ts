import { InputType, Field, PartialType } from '@nestjs/graphql';
import { CreateDecisionInput } from './create-decision.input';

@InputType()
export class UpdateDecisionInput extends PartialType(CreateDecisionInput) {
  @Field()
  id: string;
}
