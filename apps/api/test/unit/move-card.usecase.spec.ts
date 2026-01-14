import { MoveCardUseCase } from '../../src/modules/cards/application/move-card.usecase';
import {
  CardNotFoundError,
  ColumnNotFoundError,
  InvalidMoveError
} from '../../src/modules/cards/domain/card.errors';
import { CardsRepository } from '../../src/modules/cards/infra/cards.repository';

describe('MoveCardUseCase', () => {
  const makeRepository = (): jest.Mocked<CardsRepository> => ({
    getLastPositionByColumn: jest.fn(),
    columnExists: jest.fn(),
    createCard: jest.fn(),
    findCardById: jest.fn(),
    findCardWithColumnAndBoard: jest.fn(),
    findColumnById: jest.fn(),
    moveCard: jest.fn(),
    updateCard: jest.fn(),
    deleteCard: jest.fn()
  });

  it('should move card when destination column is in same board', async () => {
    const repository = makeRepository();
    const useCase = new MoveCardUseCase(repository);

    repository.findCardWithColumnAndBoard.mockResolvedValue({
      id: 'card-1',
      columnId: 'column-1',
      column: { id: 'column-1', boardId: 'board-1' }
    });
    repository.findColumnById.mockResolvedValue({ id: 'column-2', boardId: 'board-1' });
    repository.getLastPositionByColumn.mockResolvedValue(2);
    repository.moveCard.mockResolvedValue({
      id: 'card-1',
      title: 'Card',
      description: null,
      position: 3,
      columnId: 'column-2'
    });

    const result = await useCase.execute('card-1', 'column-2');

    expect(result.position).toBe(3);
    expect(repository.getLastPositionByColumn).toHaveBeenCalledWith('column-2');
    expect(repository.moveCard).toHaveBeenCalledWith('card-1', 'column-2', 3);
  });

  it('should throw CardNotFoundError when card does not exist', async () => {
    const repository = makeRepository();
    const useCase = new MoveCardUseCase(repository);

    repository.findCardWithColumnAndBoard.mockResolvedValue(null);

    await expect(useCase.execute('missing-card', 'column-2')).rejects.toBeInstanceOf(
      CardNotFoundError
    );
  });

  it('should throw ColumnNotFoundError when destination column does not exist', async () => {
    const repository = makeRepository();
    const useCase = new MoveCardUseCase(repository);

    repository.findCardWithColumnAndBoard.mockResolvedValue({
      id: 'card-1',
      columnId: 'column-1',
      column: { id: 'column-1', boardId: 'board-1' }
    });
    repository.findColumnById.mockResolvedValue(null);

    await expect(useCase.execute('card-1', 'missing-column')).rejects.toBeInstanceOf(
      ColumnNotFoundError
    );
  });

  it('should throw InvalidMoveError when destination board differs', async () => {
    const repository = makeRepository();
    const useCase = new MoveCardUseCase(repository);

    repository.findCardWithColumnAndBoard.mockResolvedValue({
      id: 'card-1',
      columnId: 'column-1',
      column: { id: 'column-1', boardId: 'board-1' }
    });
    repository.findColumnById.mockResolvedValue({ id: 'column-2', boardId: 'board-2' });

    await expect(useCase.execute('card-1', 'column-2')).rejects.toBeInstanceOf(
      InvalidMoveError
    );
  });
});
