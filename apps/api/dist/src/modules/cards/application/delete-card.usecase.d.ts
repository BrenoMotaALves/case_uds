import { CardsRepository } from '../infra/cards.repository';
export declare class DeleteCardUseCase {
    private readonly cardsRepository;
    constructor(cardsRepository: CardsRepository);
    execute(id: string): Promise<void>;
}
