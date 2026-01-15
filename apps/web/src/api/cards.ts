import { http } from './http';
import type { Card } from './types';

export async function createCard(
  columnId: string,
  payload: { title: string; description?: string }
): Promise<Card> {
  return http<Card>(`/columns/${columnId}/cards`, {
    method: 'POST',
    body: JSON.stringify(payload)
  });
}

export async function deleteCard(cardId: string): Promise<void> {
  await http<void>(`/cards/${cardId}`, { method: 'DELETE' });
}

export async function moveCard(cardId: string, newColumnId: string): Promise<Card> {
  return http<Card>(`/cards/${cardId}/move`, {
    method: 'PATCH',
    body: JSON.stringify({ newColumnId })
  });
}
