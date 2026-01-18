import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { OutcomesService } from "./outcomes.service";
import { OutcomesResolver } from "./outcomes.resolver";
import { Outcome } from "./entities/outcome.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Outcome])],
  providers: [OutcomesService, OutcomesResolver],
  exports: [OutcomesService],
})
export class OutcomesModule {}
