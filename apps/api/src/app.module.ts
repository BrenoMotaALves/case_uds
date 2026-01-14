import { Module } from '@nestjs/common';
import { HealthController } from './health.controller';
import { BoardsModule } from './modules/boards/boards.module';
import { CardsModule } from './modules/cards/cards.module';
import { ColumnsModule } from './modules/columns/columns.module';
import { PrismaModule } from './shared/prisma/prisma.module';

@Module({
  imports: [PrismaModule, BoardsModule, ColumnsModule, CardsModule],
  controllers: [HealthController]
})
export class AppModule {}
