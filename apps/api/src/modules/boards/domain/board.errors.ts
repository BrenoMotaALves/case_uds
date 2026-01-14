export class BoardNotFoundError extends Error {
  constructor(id: string) {
    super(`Board with id ${id} not found`);
    this.name = 'BoardNotFoundError';
  }
}
