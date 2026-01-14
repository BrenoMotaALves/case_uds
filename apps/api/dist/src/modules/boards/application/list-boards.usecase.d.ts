import { BoardsRepository } from '../infra/boards.repository';
export declare class ListBoardsUseCase {
    private readonly boardsRepository;
    constructor(boardsRepository: BoardsRepository);
    execute(): Promise<import("../infra/boards.repository").BoardListItem[]>;
}
