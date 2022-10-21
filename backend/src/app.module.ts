import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import config from './mikro-orm.config';
import { NodeModule } from './node/node.module';

@Module({
  imports: [MikroOrmModule.forRoot(config), NodeModule],
})
export class AppModule {}
