import { http } from './http';
import type { BoardDetail, BoardSummary } from './types';

export async function listBoards(): Promise<BoardSummary[]> {
  return http<BoardSummary[]>('/boards');
}

export async function createBoard(name: string): Promise<BoardDetail | BoardSummary> {
  return http<BoardDetail | BoardSummary>('/boards', {
    method: 'POST',
    body: JSON.stringify({ name })
  });
}

export async function getBoard(id: string): Promise<BoardDetail> {
  return http<BoardDetail>(`/boards/${id}`);
}
