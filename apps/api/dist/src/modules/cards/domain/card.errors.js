"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvalidMoveError = exports.ColumnNotFoundError = exports.CardNotFoundError = void 0;
class CardNotFoundError extends Error {
    constructor(id) {
        super(`Card with id ${id} not found`);
        this.name = 'CardNotFoundError';
    }
}
exports.CardNotFoundError = CardNotFoundError;
class ColumnNotFoundError extends Error {
    constructor(id) {
        super(`Column with id ${id} not found`);
        this.name = 'ColumnNotFoundError';
    }
}
exports.ColumnNotFoundError = ColumnNotFoundError;
class InvalidMoveError extends Error {
    constructor() {
        super('Card can only be moved within the same board');
        this.name = 'InvalidMoveError';
    }
}
exports.InvalidMoveError = InvalidMoveError;
//# sourceMappingURL=card.errors.js.map