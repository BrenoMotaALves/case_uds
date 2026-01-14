import { InvalidMoveError } from './card.errors';

export class CardPolicy {
  static ensureCanMove(sourceBoardId: string, destinationBoardId: string) {
    if (sourceBoardId !== destinationBoardId) {
      throw new InvalidMoveError();
    }
  }
}
