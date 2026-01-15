import { CreateBoardUseCase } from '../application/create-board.usecase';
import { DeleteBoardUseCase } from '../application/delete-board.usecase';
import { GetBoardUseCase } from '../application/get-board.usecase';
import { ListBoardsUseCase } from '../application/list-boards.usecase';
import { UpdateBoardUseCase } from '../application/update-board.usecase';
import { CreateBoardDto, UpdateBoardDto } from './boards.dto';
export declare class BoardsController {
    private readonly createBoardUseCase;
    private readonly deleteBoardUseCase;
    private readonly listBoardsUseCase;
    private readonly getBoardUseCase;
    private readonly updateBoardUseCase;
    constructor(createBoardUseCase: CreateBoardUseCase, deleteBoardUseCase: DeleteBoardUseCase, listBoardsUseCase: ListBoardsUseCase, getBoardUseCase: GetBoardUseCase, updateBoardUseCase: UpdateBoardUseCase);
    create(body: CreateBoardDto): Promise<import("../infra/boards.repository").BoardCreated>;
    list(): Promise<import("../infra/boards.repository").BoardListItem[]>;
    getById(id: string): Promise<import("../infra/boards.repository").BoardWithNested>;
    update(id: string, body: UpdateBoardDto): Promise<import("../infra/boards.repository").Board>;
    delete(id: string): Promise<void>;
}
