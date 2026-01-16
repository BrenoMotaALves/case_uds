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

export async function updateBoard(
  boardId: string,
  payload: { name: string }
): Promise<BoardDetail | BoardSummary> {
  return http<BoardDetail | BoardSummary>(`/boards/${boardId}`, {
    method: 'PUT',
    body: JSON.stringify(payload)
  });
}

export async function deleteBoard(boardId: string): Promise<void> {
  await http<void>(`/boards/${boardId}`, {
    method: 'DELETE'
  });
}
