import { Inject, Injectable } from '@nestjs/common';
import { BOARDS_REPOSITORY, BoardsRepository } from '../infra/boards.repository';

@Injectable()
export class ListBoardsUseCase {
  constructor(
    @Inject(BOARDS_REPOSITORY)
    private readonly boardsRepository: BoardsRepository
  ) {}

  async execute() {
    return this.boardsRepository.listBoards();
  }
}
