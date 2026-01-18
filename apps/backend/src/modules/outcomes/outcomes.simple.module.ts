import { Module } from '@nestjs/common';
import { OutcomesService } from './outcomes.simple.service';
import { OutcomesResolver } from './outcomes.resolver';

@Module({
  providers: [OutcomesService, OutcomesResolver],
  exports: [OutcomesService],
})
export class OutcomesModule {}
