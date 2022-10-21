import { EntityRepository } from '@mikro-orm/better-sqlite';
import { wrap } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateNodeDto } from './dto/create-node.dto';
import { UpdateNodeDto } from './dto/update-node.dto';
import { Node } from './entities/node.entity';

@Injectable()
export class NodeService {
  constructor(
    @InjectRepository(Node)
    private readonly nodeRepository: EntityRepository<Node>,
  ) {}

  async create(dto: CreateNodeDto) {
    if (dto.id) {
      const exists = await this.nodeRepository.count(dto.id);
      if (exists) throw new ConflictException('Already Exists');
    }
    const node = new Node(dto);
    await this.nodeRepository.persistAndFlush(node);
    return node;
  }

  async findAll(): Promise<Node[]> {
    return this.nodeRepository.findAll();
  }

  async findOne(id: string): Promise<Node> {
    const node = await this.nodeRepository.findOne(id);
    if (!node) throw new NotFoundException();
    return node;
  }

  async update(id: string, dto: UpdateNodeDto) {
    const node = await this.findOne(id);
    wrap(node).assign(dto);
    await this.nodeRepository.flush();
    return node;
  }

  async remove(id: string) {
    const node = this.findOne(id);
    await this.nodeRepository.removeAndFlush(node);
    return node;
  }
}
