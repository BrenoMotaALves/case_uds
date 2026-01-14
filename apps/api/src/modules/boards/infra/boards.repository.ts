export const BOARDS_REPOSITORY = Symbol('BOARDS_REPOSITORY');

export type CreateBoardInput = {
  name: string;
  columns: { name: string }[];
};

export type BoardListItem = {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
};

export type BoardWithNested = {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  columns: Array<{
    id: string;
    name: string;
    position: number;
    cards: Array<{
      id: string;
      title: string;
      description: string | null;
      position: number;
      columnId: string;
    }>;
  }>;
};

export type BoardCreated = BoardWithNested | { id: string; name: string };

export interface BoardsRepository {
  createBoardWithColumns(input: CreateBoardInput): Promise<BoardCreated>;
  listBoards(): Promise<BoardListItem[]>;
  getBoardByIdWithNested(id: string): Promise<BoardWithNested | null>;
}
