import { PrismaService } from '../../../shared/prisma/prisma.service';
import { Board, BoardCreated, BoardListItem, BoardWithNested, BoardsRepository, CreateBoardInput } from './boards.repository';
export declare class BoardsPrismaRepository implements BoardsRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    createBoardWithColumns(input: CreateBoardInput): Promise<BoardCreated>;
    listBoards(): Promise<BoardListItem[]>;
    getBoardByIdWithNested(id: string): Promise<BoardWithNested | null>;
    findById(id: string): Promise<Board | null>;
    updateBoard(id: string, name: string): Promise<Board>;
    deleteBoard(id: string): Promise<void>;
}
