import { Module } from '@nestjs/common';
import { HealthController } from './health.controller';
import { BoardsModule } from './modules/boards/boards.module';
import { CardsModule } from './modules/cards/cards.module';
import { ColumnsModule } from './modules/columns/columns.module';
import { PrismaModule } from './shared/prisma/prisma.module';
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionMapperFilter } from './shared/errors/http-exception.mapper';

@Module({
  imports: [PrismaModule, BoardsModule, ColumnsModule, CardsModule],
  controllers: [HealthController],
  providers:[
    {
      provide: APP_FILTER,
      useClass: HttpExceptionMapperFilter,
    }
  ]
})
export class AppModule {}
