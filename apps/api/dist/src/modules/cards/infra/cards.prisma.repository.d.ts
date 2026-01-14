import { PrismaService } from '../../../shared/prisma/prisma.service';
import { CardEntity, CardsRepository, CreateCardInput, UpdateCardInput } from './cards.repository';
export declare class CardsPrismaRepository implements CardsRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    getLastPositionByColumn(columnId: string): Promise<number>;
    columnExists(columnId: string): Promise<boolean>;
    createCard(input: CreateCardInput): Promise<CardEntity>;
    findCardById(id: string): Promise<CardEntity | null>;
    findCardWithColumnAndBoard(id: string): Promise<{
        id: string;
        columnId: string;
        column: {
            id: string;
            boardId: string;
        };
    } | null>;
    findColumnById(id: string): Promise<{
        id: string;
        boardId: string;
    } | null>;
    moveCard(id: string, newColumnId: string, newPosition: number): Promise<CardEntity>;
    updateCard(id: string, data: UpdateCardInput): Promise<CardEntity>;
    deleteCard(id: string): Promise<void>;
}
