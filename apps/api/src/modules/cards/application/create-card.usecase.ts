import { Inject, Injectable } from '@nestjs/common';
import { ColumnNotFoundError } from '../domain/card.errors';
import { CARDS_REPOSITORY, CardsRepository } from '../infra/cards.repository';

@Injectable()
export class CreateCardUseCase {
  constructor(
    @Inject(CARDS_REPOSITORY)
    private readonly cardsRepository: CardsRepository
  ) {}

  async execute(input: { columnId: string; title: string; description?: string }) {
    const columnExists = await this.cardsRepository.columnExists(input.columnId);

    if (!columnExists) {
      throw new ColumnNotFoundError(input.columnId);
    }

    const lastPosition = await this.cardsRepository.getLastPositionByColumn(input.columnId);
    const nextPosition = lastPosition + 1;

    return this.cardsRepository.createCard({
      columnId: input.columnId,
      title: input.title,
      description: input.description ?? null,
      position: nextPosition
    });
  }
}
