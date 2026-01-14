import { CardsRepository } from '../infra/cards.repository';
export declare class CreateCardUseCase {
    private readonly cardsRepository;
    constructor(cardsRepository: CardsRepository);
    execute(input: {
        columnId: string;
        title: string;
        description?: string;
    }): Promise<import("../infra/cards.repository").CardEntity>;
}
