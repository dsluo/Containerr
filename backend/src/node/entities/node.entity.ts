import {
  Entity,
  IdentifiedReference,
  ManyToOne,
  PrimaryKey,
  Property,
  Reference,
} from '@mikro-orm/core';
import { v4 as uuid4 } from 'uuid';
import { CreateNodeDto } from '../dto/create-node.dto';

@Entity()
export class Node {
  @PrimaryKey()
  id = uuid4();

  @Property()
  name!: string;

  @ManyToOne(() => Node, { nullable: true, wrappedReference: true })
  parent?: IdentifiedReference<Node>;

  constructor(dto: CreateNodeDto) {
    this.id = dto.id ?? uuid4();
    this.name = dto.name;
    this.parent = dto.parentId
      ? Reference.createFromPK(Node, dto.parentId)
      : undefined;
  }
}
