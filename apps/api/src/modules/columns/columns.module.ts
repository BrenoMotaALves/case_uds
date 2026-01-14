import { Module } from '@nestjs/common';
import { CreateColumnUseCase } from './application/create-column.usecase';
import { COLUMNS_REPOSITORY } from './infra/columns.repository';
import { ColumnsPrismaRepository } from './infra/columns.prisma.repository';
import { ColumnsController } from './presentation/columns.controller';

@Module({
  controllers: [ColumnsController],
  providers: [
    CreateColumnUseCase,
    {
      provide: COLUMNS_REPOSITORY,
      useClass: ColumnsPrismaRepository
    }
  ]
})
export class ColumnsModule {}
