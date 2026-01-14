"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BoardNotFoundError = void 0;
class BoardNotFoundError extends Error {
    constructor(id) {
        super(`Board with id ${id} not found`);
        this.name = 'BoardNotFoundError';
    }
}
exports.BoardNotFoundError = BoardNotFoundError;
//# sourceMappingURL=board.errors.js.map