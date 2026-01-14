import { PrismaService } from '../../../shared/prisma/prisma.service';
import { BoardCreated, BoardListItem, BoardWithNested, BoardsRepository, CreateBoardInput } from './boards.repository';
export declare class BoardsPrismaRepository implements BoardsRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    createBoardWithColumns(input: CreateBoardInput): Promise<BoardCreated>;
    listBoards(): Promise<BoardListItem[]>;
    getBoardByIdWithNested(id: string): Promise<BoardWithNested | null>;
}
