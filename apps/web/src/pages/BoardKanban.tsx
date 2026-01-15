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
  const [status, setStatus] = useState('');
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
    setStatus('Saving...');
    try {
      await createCard(columnId, payload);
      await fetchBoard();
    } finally {
      setStatus('');
    }
  };

  const handleDeleteCard = async (cardId: string) => {
    setStatus('Deleting...');
    try {
      await deleteCard(cardId);
      await fetchBoard();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Falha ao remover card.');
    } finally {
      setStatus('');
    }
  };

  const handleMoveConfirm = async (newColumnId: string) => {
    if (!movingCard) {
      return;
    }
    setStatus('Moving...');
    try {
      await moveCard(movingCard.id, newColumnId);
      setMovingCard(null);
      await fetchBoard();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Falha ao mover card.');
    } finally {
      setStatus('');
    }
  };

  const sortedColumns = useMemo(() => {
    if (!board) {
      return [];
    }
    return [...board.columns].sort((a, b) => a.position - b.position);
  }, [board]);

  const hasCards = sortedColumns.some((column) => column.cards.length > 0);

  return (
    <div className="page">
      <header className="page-header">
        <h1>{board?.name ?? 'Board'}</h1>
      </header>

      {status && <p>{status}</p>}
      {error && <p className="error-text">{error}</p>}

      {loading ? (
        <p>Loading...</p>
      ) : !board || sortedColumns.length === 0 ? (
        <section className="placeholder">
          <p>Nenhuma coluna encontrada para este board.</p>
        </section>
      ) : (
        <div className="kanban-grid">
          {!hasCards && (
            <div className="placeholder">
              <p>Sem cards ainda. Crie o primeiro card em uma das colunas.</p>
            </div>
          )}
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
        columns={board?.columns ?? []}
        onClose={() => setMovingCard(null)}
        onConfirm={handleMoveConfirm}
      />
    </div>
  );
};

export default BoardKanban;
