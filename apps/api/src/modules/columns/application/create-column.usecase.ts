import { Inject, Injectable } from '@nestjs/common';
import { BoardNotFoundError } from '../../boards/domain/board.errors';
import { PrismaService } from '../../../shared/prisma/prisma.service';
import {
  COLUMNS_REPOSITORY,
  ColumnsRepository
} from '../infra/columns.repository';

@Injectable()
export class CreateColumnUseCase {
  constructor(
    @Inject(COLUMNS_REPOSITORY)
    private readonly columnsRepository: ColumnsRepository,
    private readonly prisma: PrismaService
  ) {}

  async execute(input: { boardId: string; name: string }) {
    const boardExists = await this.prisma.board.findUnique({
      where: { id: input.boardId },
      select: { id: true }
    });

    if (!boardExists) {
      throw new BoardNotFoundError(input.boardId);
    }

    const lastPosition = await this.columnsRepository.getLastPositionByBoard(input.boardId);
    const nextPosition = lastPosition + 1;

    return this.columnsRepository.createColumn({
      boardId: input.boardId,
      name: input.name,
      position: nextPosition
    });
  }
}
