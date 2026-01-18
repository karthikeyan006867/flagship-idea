import { Resolver, Query, Mutation, Args } from "@nestjs/graphql";
import { DecisionsService } from "./decisions.service";
import { Decision } from "./entities/decision.entity";
import { CreateDecisionInput } from "./dto/create-decision.input";
import { UpdateDecisionInput } from "./dto/update-decision.input";

@Resolver(() => Decision)
export class DecisionsResolver {
  constructor(private readonly decisionsService: DecisionsService) {}

  @Mutation(() => Decision)
  createDecision(
    @Args("createDecisionInput") createDecisionInput: CreateDecisionInput,
  ) {
    return this.decisionsService.create(createDecisionInput);
  }

  @Query(() => [Decision], { name: "decisions" })
  findAll() {
    return this.decisionsService.findAll();
  }

  @Query(() => Decision, { name: "decision" })
  findOne(@Args("id") id: string) {
    return this.decisionsService.findOne(id);
  }

  @Mutation(() => Decision)
  updateDecision(
    @Args("updateDecisionInput") updateDecisionInput: UpdateDecisionInput,
  ) {
    return this.decisionsService.update(
      updateDecisionInput.id,
      updateDecisionInput,
    );
  }

  @Mutation(() => Boolean)
  removeDecision(@Args("id") id: string) {
    return this.decisionsService.remove(id);
  }
}
