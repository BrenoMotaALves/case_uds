export class CardNotFoundError extends Error {
  constructor(id: string) {
    super(`Card with id ${id} not found`);
    this.name = 'CardNotFoundError';
  }
}

export class ColumnNotFoundError extends Error {
  constructor(id: string) {
    super(`Column with id ${id} not found`);
    this.name = 'ColumnNotFoundError';
  }
}

export class InvalidMoveError extends Error {
  constructor() {
    super('Card can only be moved within the same board');
    this.name = 'InvalidMoveError';
  }
}
