import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Decision } from "./entities/decision.entity";
import { CreateDecisionInput } from "./dto/create-decision.input";
import { UpdateDecisionInput } from "./dto/update-decision.input";

@Injectable()
export class DecisionsService {
  constructor(
    @InjectRepository(Decision)
    private decisionsRepository: Repository<Decision>,
  ) {}

  async create(createDecisionInput: CreateDecisionInput): Promise<Decision> {
    const decision = this.decisionsRepository.create(createDecisionInput);
    return this.decisionsRepository.save(decision);
  }

  async findAll(): Promise<Decision[]> {
    return this.decisionsRepository.find({
      relations: ["user", "outcomes"],
      order: { createdAt: "DESC" },
    });
  }

  async findOne(id: string): Promise<Decision> {
    return this.decisionsRepository.findOne({
      where: { id },
      relations: ["user", "outcomes"],
    });
  }

  async update(
    id: string,
    updateDecisionInput: UpdateDecisionInput,
  ): Promise<Decision> {
    await this.decisionsRepository.update(id, updateDecisionInput);
    return this.findOne(id);
  }

  async remove(id: string): Promise<boolean> {
    const result = await this.decisionsRepository.delete(id);
    return result.affected > 0;
  }

  async findByUser(userId: string): Promise<Decision[]> {
    return this.decisionsRepository.find({
      where: { userId },
      relations: ["outcomes"],
      order: { createdAt: "DESC" },
    });
  }
}
