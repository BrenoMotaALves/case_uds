import { BoardsRepository } from '../infra/boards.repository';
type UpdateBoardInput = {
    id: string;
    name: string;
};
export declare class UpdateBoardUseCase {
    private readonly boardsRepository;
    constructor(boardsRepository: BoardsRepository);
    execute({ id, name }: UpdateBoardInput): Promise<import("../infra/boards.repository").Board>;
}
export {};
