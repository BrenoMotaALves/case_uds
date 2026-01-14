import { Inject, Injectable } from '@nestjs/common';
import {
  BOARDS_REPOSITORY,
  BoardsRepository,
  CreateBoardInput
} from '../infra/boards.repository';

const DEFAULT_COLUMNS = ['To Do', 'In Progress', 'Done'];

@Injectable()
export class CreateBoardUseCase {
  constructor(
    @Inject(BOARDS_REPOSITORY)
    private readonly boardsRepository: BoardsRepository
  ) {}

  async execute(input: { name: string; columns?: { name: string }[] }) {
    const columns =
      input.columns && input.columns.length > 0
        ? input.columns
        : DEFAULT_COLUMNS.map((name) => ({ name }));

    const payload: CreateBoardInput = {
      name: input.name,
      columns
    };

    return this.boardsRepository.createBoardWithColumns(payload);
  }
}
