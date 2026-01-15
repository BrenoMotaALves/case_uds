import { BoardsRepository } from '../infra/boards.repository';
export declare class DeleteBoardUseCase {
    private readonly boardsRepository;
    constructor(boardsRepository: BoardsRepository);
    execute(id: string): Promise<void>;
}
