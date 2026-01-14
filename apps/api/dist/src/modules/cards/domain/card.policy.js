"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CardPolicy = void 0;
const card_errors_1 = require("./card.errors");
class CardPolicy {
    static ensureCanMove(sourceBoardId, destinationBoardId) {
        if (sourceBoardId !== destinationBoardId) {
            throw new card_errors_1.InvalidMoveError();
        }
    }
}
exports.CardPolicy = CardPolicy;
//# sourceMappingURL=card.policy.js.map