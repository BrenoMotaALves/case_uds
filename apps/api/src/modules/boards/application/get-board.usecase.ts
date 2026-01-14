import { Inject, Injectable } from '@nestjs/common';
import { BoardNotFoundError } from '../domain/board.errors';
import { BOARDS_REPOSITORY, BoardsRepository } from '../infra/boards.repository';

@Injectable()
export class GetBoardUseCase {
  constructor(
    @Inject(BOARDS_REPOSITORY)
    private readonly boardsRepository: BoardsRepository
  ) {}

  async execute(id: string) {
    const board = await this.boardsRepository.getBoardByIdWithNested(id);

    if (!board) {
      throw new BoardNotFoundError(id);
    }

    return board;
  }
}
