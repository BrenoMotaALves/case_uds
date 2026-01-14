import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../shared/prisma/prisma.service';
import {
  CardEntity,
  CardsRepository,
  CreateCardInput,
  UpdateCardInput
} from './cards.repository';

@Injectable()
export class CardsPrismaRepository implements CardsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async getLastPositionByColumn(columnId: string): Promise<number> {
    const card = await this.prisma.card.findFirst({
      where: { columnId },
      orderBy: { position: 'desc' },
      select: { position: true }
    });

    return card?.position ?? 0;
  }

  async columnExists(columnId: string): Promise<boolean> {
    const column = await this.prisma.column.findUnique({
      where: { id: columnId },
      select: { id: true }
    });

    return Boolean(column);
  }

  async createCard(input: CreateCardInput): Promise<CardEntity> {
    return this.prisma.card.create({
      data: {
        columnId: input.columnId,
        title: input.title,
        description: input.description ?? null,
        position: input.position
      },
      select: {
        id: true,
        title: true,
        description: true,
        position: true,
        columnId: true
      }
    });
  }

  async findCardById(id: string): Promise<CardEntity | null> {
    return this.prisma.card.findUnique({
      where: { id },
      select: {
        id: true,
        title: true,
        description: true,
        position: true,
        columnId: true
      }
    });
  }

  async findCardWithColumnAndBoard(id: string): Promise<{
    id: string;
    columnId: string;
    column: { id: string; boardId: string };
  } | null> {
    return this.prisma.card.findUnique({
      where: { id },
      select: {
        id: true,
        columnId: true,
        column: {
          select: {
            id: true,
            boardId: true
          }
        }
      }
    });
  }

  async findColumnById(id: string): Promise<{ id: string; boardId: string } | null> {
    return this.prisma.column.findUnique({
      where: { id },
      select: {
        id: true,
        boardId: true
      }
    });
  }

  async moveCard(id: string, newColumnId: string, newPosition: number): Promise<CardEntity> {
    return this.prisma.card.update({
      where: { id },
      data: {
        columnId: newColumnId,
        position: newPosition
      },
      select: {
        id: true,
        title: true,
        description: true,
        position: true,
        columnId: true
      }
    });
  }

  async updateCard(id: string, data: UpdateCardInput): Promise<CardEntity> {
    return this.prisma.card.update({
      where: { id },
      data: {
        title: data.title,
        description: data.description
      },
      select: {
        id: true,
        title: true,
        description: true,
        position: true,
        columnId: true
      }
    });
  }

  async deleteCard(id: string): Promise<void> {
    await this.prisma.card.delete({
      where: { id }
    });
  }
}
