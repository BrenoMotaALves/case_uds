"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ColumnNotFoundError = void 0;
class ColumnNotFoundError extends Error {
    constructor(id) {
        super(`Column with id ${id} not found`);
        this.name = 'ColumnNotFoundError';
    }
}
exports.ColumnNotFoundError = ColumnNotFoundError;
//# sourceMappingURL=column.errors.js.map