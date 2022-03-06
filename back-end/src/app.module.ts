import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { AuthModuleOptions } from '@nestjs/passport';
import { AppGateway } from './app.gateway';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/user.entity';
import { GameModule } from './game/game.module';
import { Game } from './game/game.entity';

@Module({
  imports: [AuthModule,AuthModuleOptions,ConfigModule.forRoot(),TypeOrmModule.forRoot(
    {
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'zdnaya',
      password: '',
      database: 'postgres',
      entities:[User,Game],
      synchronize: true,
    }
  ), UserModule, GameModule],
  controllers: [AppController],
  providers: [AppService,AuthModuleOptions,AppGateway],
  exports: [AppGateway],
})
export class AppModule {}
