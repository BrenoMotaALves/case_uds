import { Inject, Injectable } from '@nestjs/common';
import { CardNotFoundError } from '../domain/card.errors';
import { CARDS_REPOSITORY, CardsRepository } from '../infra/cards.repository';

@Injectable()
export class DeleteCardUseCase {
  constructor(
    @Inject(CARDS_REPOSITORY)
    private readonly cardsRepository: CardsRepository
  ) {}

  async execute(id: string): Promise<void> {
    const existing = await this.cardsRepository.findCardById(id);

    if (!existing) {
      throw new CardNotFoundError(id);
    }

    await this.cardsRepository.deleteCard(id);
  }
}
