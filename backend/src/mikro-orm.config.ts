import { Options } from '@mikro-orm/core';
import { Logger } from '@nestjs/common';

const logger = new Logger('MikroORM');
const config: Options = {
  entities: ['./dist/**/*.entity.js'],
  entitiesTs: ['./src/**/*.entity.ts'],
  dbName: 'db.sqlite3',
  type: 'better-sqlite',
  logger: logger.log.bind(logger),
};

export default config;
