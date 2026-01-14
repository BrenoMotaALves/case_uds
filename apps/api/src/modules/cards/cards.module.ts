import { Module } from '@nestjs/common';
import { CreateCardUseCase } from './application/create-card.usecase';
import { DeleteCardUseCase } from './application/delete-card.usecase';
import { MoveCardUseCase } from './application/move-card.usecase';
import { UpdateCardUseCase } from './application/update-card.usecase';
import { CARDS_REPOSITORY } from './infra/cards.repository';
import { CardsPrismaRepository } from './infra/cards.prisma.repository';
import { CardsController } from './presentation/cards.controller';

@Module({
  controllers: [CardsController],
  providers: [
    CreateCardUseCase,
    UpdateCardUseCase,
    DeleteCardUseCase,
    MoveCardUseCase,
    {
      provide: CARDS_REPOSITORY,
      useClass: CardsPrismaRepository
    }
  ]
})
export class CardsModule {}
