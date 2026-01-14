import { CardsRepository } from '../infra/cards.repository';
export declare class MoveCardUseCase {
    private readonly cardsRepository;
    constructor(cardsRepository: CardsRepository);
    execute(cardId: string, newColumnId: string): Promise<import("../infra/cards.repository").CardEntity>;
}
