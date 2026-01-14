export const COLUMNS_REPOSITORY = Symbol('COLUMNS_REPOSITORY');

export type CreateColumnInput = {
  boardId: string;
  name: string;
  position: number;
};

export type ColumnEntity = {
  id: string;
  name: string;
  position: number;
  boardId: string;
};

export interface ColumnsRepository {
  getLastPositionByBoard(boardId: string): Promise<number>;
  createColumn(input: CreateColumnInput): Promise<ColumnEntity>;
}
