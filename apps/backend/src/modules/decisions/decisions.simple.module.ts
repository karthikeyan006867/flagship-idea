import { Module } from '@nestjs/common';
import { DecisionsService } from './decisions.service';
import { DecisionsResolver } from './decisions.resolver';

@Module({
  providers: [DecisionsService, DecisionsResolver],
  exports: [DecisionsService],
})
export class DecisionsModule {}
