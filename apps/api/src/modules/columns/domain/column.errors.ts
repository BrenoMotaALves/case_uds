export class ColumnNotFoundError extends Error {
  constructor(id: string) {
    super(`Column with id ${id} not found`);
    this.name = 'ColumnNotFoundError';
  }
}
