export type BoardSummary = {
  id: string;
  name: string;
};

export async function listBoards(): Promise<BoardSummary[]> {
  return [];
}