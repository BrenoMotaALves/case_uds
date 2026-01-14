export type CardSummary = {
  id: string;
  title: string;
};

export async function listCards(): Promise<CardSummary[]> {
  return [];
}