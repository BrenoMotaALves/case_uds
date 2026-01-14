export const CARDS_REPOSITORY = Symbol('CARDS_REPOSITORY');

export type CreateCardInput = {
  columnId: string;
  title: string;
  description?: string | null;
  position: number;
};

export type UpdateCardInput = {
  title?: string;
  description?: string | null;
};

export type CardEntity = {
  id: string;
  title: string;
  description: string | null;
  position: number;
  columnId: string;
};

export interface CardsRepository {
  getLastPositionByColumn(columnId: string): Promise<number>;
  columnExists(columnId: string): Promise<boolean>;
  createCard(input: CreateCardInput): Promise<CardEntity>;
  findCardById(id: string): Promise<CardEntity | null>;
  findCardWithColumnAndBoard(id: string): Promise<{
    id: string;
    columnId: string;
    column: { id: string; boardId: string };
  } | null>;
  findColumnById(id: string): Promise<{ id: string; boardId: string } | null>;
  moveCard(id: string, newColumnId: string, newPosition: number): Promise<CardEntity>;
  updateCard(id: string, data: UpdateCardInput): Promise<CardEntity>;
  deleteCard(id: string): Promise<void>;
}
