import { Inject, Injectable } from '@nestjs/common';
import { BoardNotFoundError } from '../domain/board.errors';
import { BOARDS_REPOSITORY, BoardsRepository } from '../infra/boards.repository';

@Injectable()
export class DeleteBoardUseCase {
  constructor(
    @Inject(BOARDS_REPOSITORY)
    private readonly boardsRepository: BoardsRepository
  ) {}

  async execute(id: string): Promise<void> {
    const board = await this.boardsRepository.findById(id);
    if (!board) {
      throw new BoardNotFoundError(id);
    }
    await this.boardsRepository.deleteBoard(id);
  }
}
