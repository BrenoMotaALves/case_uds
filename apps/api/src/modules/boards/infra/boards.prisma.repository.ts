import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../shared/prisma/prisma.service';
import {
  BoardCreated,
  BoardListItem,
  BoardWithNested,
  BoardsRepository,
  CreateBoardInput
} from './boards.repository';

@Injectable()
export class BoardsPrismaRepository implements BoardsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createBoardWithColumns(input: CreateBoardInput): Promise<BoardCreated> {
    return this.prisma.$transaction(async (tx) => {
      const board = await tx.board.create({
        data: {
          name: input.name
        }
      });

      await tx.column.createMany({
        data: input.columns.map((column, index) => ({
          name: column.name,
          position: index + 1,
          boardId: board.id
        }))
      });

      return tx.board.findUniqueOrThrow({
        where: { id: board.id },
        include: {
          columns: {
            orderBy: { position: 'asc' },
            include: { cards: { orderBy: { position: 'asc' } } }
          }
        }
      });
    });
  }

  async listBoards(): Promise<BoardListItem[]> {
    return this.prisma.board.findMany({
      select: {
        id: true,
        name: true,
        createdAt: true,
        updatedAt: true
      },
      orderBy: { createdAt: 'desc' }
    });
  }

  async getBoardByIdWithNested(id: string): Promise<BoardWithNested | null> {
    return this.prisma.board.findUnique({
      where: { id },
      include: {
        columns: {
          orderBy: { position: 'asc' },
          include: { cards: { orderBy: { position: 'asc' } } }
        }
      }
    });
  }
}
