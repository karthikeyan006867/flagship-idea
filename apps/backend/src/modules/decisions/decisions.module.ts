import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DecisionsService } from './decisions.service';
import { DecisionsResolver } from './decisions.resolver';
import { Decision } from './entities/decision.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Decision])],
  providers: [DecisionsService, DecisionsResolver],
  exports: [DecisionsService],
})
export class DecisionsModule {}
