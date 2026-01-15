import { Inject, Injectable } from '@nestjs/common';
import { BoardNotFoundError } from '../domain/board.errors';
import { BOARDS_REPOSITORY, BoardsRepository } from '../infra/boards.repository';

type UpdateBoardInput = {
  id: string;
  name: string;
};

@Injectable()
export class UpdateBoardUseCase {
  constructor(
    @Inject(BOARDS_REPOSITORY)
    private readonly boardsRepository: BoardsRepository
  ) {}

  async execute({ id, name }: UpdateBoardInput) {
    const board = await this.boardsRepository.findById(id);
    if (!board) {
      throw new BoardNotFoundError(id);
    }
    return this.boardsRepository.updateBoard(id, name);
  }
}
