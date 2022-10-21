import { Module } from '@nestjs/common';
import { NodeService } from './node.service';
import { NodeController } from './node.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Node } from './entities/node.entity';

@Module({
  imports: [MikroOrmModule.forFeature([Node])],
  controllers: [NodeController],
  providers: [NodeService],
})
export class NodeModule {}
