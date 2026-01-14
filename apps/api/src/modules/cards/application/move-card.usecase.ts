import { Inject, Injectable } from '@nestjs/common';
import { CardPolicy } from '../domain/card.policy';
import { CardNotFoundError, ColumnNotFoundError } from '../domain/card.errors';
import { CARDS_REPOSITORY, CardsRepository } from '../infra/cards.repository';

@Injectable()
export class MoveCardUseCase {
  constructor(
    @Inject(CARDS_REPOSITORY)
    private readonly cardsRepository: CardsRepository
  ) {}

  async execute(cardId: string, newColumnId: string) {
    const card = await this.cardsRepository.findCardWithColumnAndBoard(cardId);

    if (!card) {
      throw new CardNotFoundError(cardId);
    }

    const destinationColumn = await this.cardsRepository.findColumnById(newColumnId);

    if (!destinationColumn) {
      throw new ColumnNotFoundError(newColumnId);
    }

    CardPolicy.ensureCanMove(card.column.boardId, destinationColumn.boardId);

    const lastPosition = await this.cardsRepository.getLastPositionByColumn(newColumnId);

    return this.cardsRepository.moveCard(cardId, newColumnId, lastPosition + 1);
  }
}
