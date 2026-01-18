import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { OutcomesService } from './outcomes.service';
import { Outcome } from './entities/outcome.entity';

@Resolver(() => Outcome)
export class OutcomesResolver {
  constructor(private readonly outcomesService: OutcomesService) {}

  @Query(() => [Outcome], { name: 'outcomes' })
  findAll() {
    return this.outcomesService.findAll();
  }

  @Query(() => [Outcome], { name: 'outcomesByDecision' })
  findByDecision(@Args('decisionId') decisionId: string) {
    return this.outcomesService.findByDecision(decisionId);
  }
}
