export type BoardSummary = {
  id: string;
  name: string;
  createdAt?: string;
  updatedAt?: string;
};

export type Card = {
  id: string;
  title: string;
  description?: string | null;
  position: number;
  columnId: string;
};

export type Column = {
  id: string;
  name: string;
  position: number;
  boardId?: string;
  cards: Card[];
};

export type BoardDetail = {
  id: string;
  name: string;
  columns: Column[];
  createdAt?: string;
  updatedAt?: string;
};
