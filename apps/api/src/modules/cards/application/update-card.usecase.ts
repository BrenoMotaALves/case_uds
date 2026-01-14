import { Inject, Injectable } from '@nestjs/common';
import { CardNotFoundError } from '../domain/card.errors';
import { CARDS_REPOSITORY, CardsRepository } from '../infra/cards.repository';

@Injectable()
export class UpdateCardUseCase {
  constructor(
    @Inject(CARDS_REPOSITORY)
    private readonly cardsRepository: CardsRepository
  ) {}

  async execute(id: string, data: { title?: string; description?: string }) {
    const existing = await this.cardsRepository.findCardById(id);

    if (!existing) {
      throw new CardNotFoundError(id);
    }

    return this.cardsRepository.updateCard(id, {
      title: data.title ?? existing.title,
      description: data.description ?? existing.description
    });
  }
}
