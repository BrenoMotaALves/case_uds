import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../shared/prisma/prisma.service';
import { ColumnEntity, ColumnsRepository, CreateColumnInput } from './columns.repository';

@Injectable()
export class ColumnsPrismaRepository implements ColumnsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async getLastPositionByBoard(boardId: string): Promise<number> {
    const column = await this.prisma.column.findFirst({
      where: { boardId },
      orderBy: { position: 'desc' },
      select: { position: true }
    });

    return column?.position ?? 0;
  }

  async createColumn(input: CreateColumnInput): Promise<ColumnEntity> {
    return this.prisma.column.create({
      data: {
        boardId: input.boardId,
        name: input.name,
        position: input.position
      },
      select: {
        id: true,
        name: true,
        position: true,
        boardId: true
      }
    });
  }
}
