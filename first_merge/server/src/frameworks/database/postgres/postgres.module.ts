import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {config} from '../../../configuration/mconfig';

@Module({
  imports: [TypeOrmModule.forRoot(config)],
  exports: [TypeOrmModule],
})
export class PostgresModule {}
