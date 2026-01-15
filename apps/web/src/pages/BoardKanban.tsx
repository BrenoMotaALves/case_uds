import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getBoard } from '../api/boards';
import { createCard, deleteCard, moveCard } from '../api/cards';
import type { BoardDetail, Card } from '../api/types';
import KanbanCard from '../components/KanbanCard';
import KanbanColumn from '../components/KanbanColumn';
import MoveCardModal from '../components/MoveCardModal';

const BoardKanban = () => {
  const { id } = useParams();
  const [board, setBoard] = useState<BoardDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [movingCard, setMovingCard] = useState<Card | null>(null);

  const fetchBoard = async () => {
    if (!id) {
      setError('Board nao encontrado.');
      setLoading(false);
      return;
    }
    setLoading(true);
    setError('');
    try {
      const data = await getBoard(id);
      setBoard(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Falha ao carregar board.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBoard();
  }, [id]);

  const handleCreateCard = async (
    columnId: string,
    payload: { title: string; description?: string }
  ) => {
    await createCard(columnId, payload);
    await fetchBoard();
  };

  const handleDeleteCard = async (cardId: string) => {
    const confirmed = window.confirm('Deseja remover este card?');
    if (!confirmed) {
      return;
    }
    try {
      await deleteCard(cardId);
      await fetchBoard();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Falha ao remover card.');
    }
  };

  const handleMoveConfirm = async (newColumnId: string) => {
    if (!movingCard) {
      return;
    }
    try {
      await moveCard(movingCard.id, newColumnId);
      setMovingCard(null);
      await fetchBoard();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Falha ao mover card.');
    }
  };

  const sortedColumns = useMemo(() => {
    if (!board) {
      return [];
    }
    return [...board.columns].sort((a, b) => a.position - b.position);
  }, [board]);

  return (
    <div className="page">
      <header className="page-header">
        <h1>{board?.name ?? 'Board'}</h1>
      </header>

      {error && <p className="error-text">{error}</p>}

      {loading ? (
        <p>Carregando board...</p>
      ) : (
        <div className="kanban-grid">
          {sortedColumns.map((column) => {
            const cards = [...column.cards].sort((a, b) => a.position - b.position);
            return (
              <KanbanColumn
                key={column.id}
                column={column}
                onCreateCard={handleCreateCard}
              >
                {cards.length === 0 ? (
                  <div className="kanban-card placeholder-card">Nenhum card.</div>
                ) : (
                  cards.map((card) => (
                    <KanbanCard
                      key={card.id}
                      card={card}
                      onDelete={handleDeleteCard}
                      onMoveRequest={setMovingCard}
                    />
                  ))
                )}
              </KanbanColumn>
            );
          })}
        </div>
      )}

      <MoveCardModal
        isOpen={Boolean(movingCard)}
        card={movingCard}
        columns={
          movingCard && board
            ? board.columns.filter((column) => column.id !== movingCard.columnId)
            : []
        }
        onClose={() => setMovingCard(null)}
        onConfirm={handleMoveConfirm}
      />
    </div>
  );
};

export default BoardKanban;
