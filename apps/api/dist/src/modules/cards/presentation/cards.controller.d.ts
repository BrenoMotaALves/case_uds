import { CreateCardUseCase } from '../application/create-card.usecase';
import { DeleteCardUseCase } from '../application/delete-card.usecase';
import { MoveCardUseCase } from '../application/move-card.usecase';
import { UpdateCardUseCase } from '../application/update-card.usecase';
import { CreateCardDto, MoveCardDto, UpdateCardDto } from './cards.dto';
export declare class CardsController {
    private readonly createCardUseCase;
    private readonly updateCardUseCase;
    private readonly deleteCardUseCase;
    private readonly moveCardUseCase;
    constructor(createCardUseCase: CreateCardUseCase, updateCardUseCase: UpdateCardUseCase, deleteCardUseCase: DeleteCardUseCase, moveCardUseCase: MoveCardUseCase);
    create(columnId: string, body: CreateCardDto): Promise<import("../infra/cards.repository").CardEntity>;
    update(id: string, body: UpdateCardDto): Promise<import("../infra/cards.repository").CardEntity>;
    move(id: string, body: MoveCardDto): Promise<import("../infra/cards.repository").CardEntity>;
    delete(id: string): Promise<void>;
}
