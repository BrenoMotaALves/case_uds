import { CardsRepository } from '../infra/cards.repository';
export declare class UpdateCardUseCase {
    private readonly cardsRepository;
    constructor(cardsRepository: CardsRepository);
    execute(id: string, data: {
        title?: string;
        description?: string;
    }): Promise<import("../infra/cards.repository").CardEntity>;
}
