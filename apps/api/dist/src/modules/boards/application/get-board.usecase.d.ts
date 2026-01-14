import { BoardsRepository } from '../infra/boards.repository';
export declare class GetBoardUseCase {
    private readonly boardsRepository;
    constructor(boardsRepository: BoardsRepository);
    execute(id: string): Promise<import("../infra/boards.repository").BoardWithNested>;
}
