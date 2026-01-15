import { Module } from '@nestjs/common';
import { CreateBoardUseCase } from './application/create-board.usecase';
import { DeleteBoardUseCase } from './application/delete-board.usecase';
import { GetBoardUseCase } from './application/get-board.usecase';
import { ListBoardsUseCase } from './application/list-boards.usecase';
import { UpdateBoardUseCase } from './application/update-board.usecase';
import { BoardsPrismaRepository } from './infra/boards.prisma.repository';
import { BOARDS_REPOSITORY } from './infra/boards.repository';
import { BoardsController } from './presentation/boards.controller';

@Module({
  controllers: [BoardsController],
  providers: [
    CreateBoardUseCase,
    DeleteBoardUseCase,
    GetBoardUseCase,
    ListBoardsUseCase,
    UpdateBoardUseCase,
    {
      provide: BOARDS_REPOSITORY,
      useClass: BoardsPrismaRepository
    }
  ]
})
export class BoardsModule {}
