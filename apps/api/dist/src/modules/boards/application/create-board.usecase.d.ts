import { BoardsRepository } from '../infra/boards.repository';
export declare class CreateBoardUseCase {
    private readonly boardsRepository;
    constructor(boardsRepository: BoardsRepository);
    execute(input: {
        name: string;
        columns?: {
            name: string;
        }[];
    }): Promise<import("../infra/boards.repository").BoardCreated>;
}
