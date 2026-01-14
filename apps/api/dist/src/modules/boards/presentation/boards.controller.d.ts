import { CreateBoardUseCase } from '../application/create-board.usecase';
import { GetBoardUseCase } from '../application/get-board.usecase';
import { ListBoardsUseCase } from '../application/list-boards.usecase';
import { CreateBoardDto } from './boards.dto';
export declare class BoardsController {
    private readonly createBoardUseCase;
    private readonly listBoardsUseCase;
    private readonly getBoardUseCase;
    constructor(createBoardUseCase: CreateBoardUseCase, listBoardsUseCase: ListBoardsUseCase, getBoardUseCase: GetBoardUseCase);
    create(body: CreateBoardDto): Promise<import("../infra/boards.repository").BoardCreated>;
    list(): Promise<import("../infra/boards.repository").BoardListItem[]>;
    getById(id: string): Promise<import("../infra/boards.repository").BoardWithNested>;
}
