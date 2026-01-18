import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Outcome } from "./entities/outcome.entity";

@Injectable()
export class OutcomesService {
  constructor(
    @InjectRepository(Outcome)
    private outcomesRepository: Repository<Outcome>,
  ) {}

  async create(createOutcomeInput: any): Promise<Outcome> {
    const outcome = this.outcomesRepository.create(createOutcomeInput);
    return this.outcomesRepository.save(outcome);
  }

  async findAll(): Promise<Outcome[]> {
    return this.outcomesRepository.find({
      relations: ["decision"],
      order: { recordedAt: "DESC" },
    });
  }

  async findByDecision(decisionId: string): Promise<Outcome[]> {
    return this.outcomesRepository.find({
      where: { decisionId },
      order: { recordedAt: "ASC" },
    });
  }
}
