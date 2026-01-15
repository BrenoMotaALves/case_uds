import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { DndContext, PointerSensor, useSensor, useSensors, type DragEndEvent } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { getBoard, updateBoard } from '../api/boards';
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
  const [isEditingName, setIsEditingName] = useState(false);
  const [editingName, setEditingName] = useState('');
  const [savingName, setSavingName] = useState(false);
  const [isMoving, setIsMoving] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 8 }
    })
  );

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
      setEditingName(data.name);
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
    setIsMoving(true);
    setStatus('Moving...');
    try {
      await moveCard(movingCard.id, newColumnId);
      setMovingCard(null);
      await fetchBoard();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Falha ao mover card.');
    } finally {
      setStatus('');
      setIsMoving(false);
    }
  };

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) {
      return;
    }
    if (active.id === over.id) {
      return;
    }
    const sourceColumnId = active.data.current?.columnId as string | undefined;
    const destinationColumnId = over.data.current?.columnId as string | undefined;
    if (!sourceColumnId || !destinationColumnId) {
      return;
    }
    if (sourceColumnId === destinationColumnId) {
      return;
    }
    setIsMoving(true);
    setStatus('Moving...');
    setError('');
    try {
      await moveCard(String(active.id), destinationColumnId);
      await fetchBoard();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Falha ao mover card.');
    } finally {
      setIsMoving(false);
      setStatus('');
    }
  };

  const handleNameSave = async () => {
    if (!board) {
      return;
    }
    if (!editingName.trim()) {
      setError('Nome do board obrigatorio.');
      return;
    }
    setSavingName(true);
    setError('');
    try {
      await updateBoard(board.id, { name: editingName.trim() });
      setBoard({ ...board, name: editingName.trim() });
      setIsEditingName(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Falha ao atualizar board.');
    } finally {
      setSavingName(false);
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
        {isEditingName ? (
          <div className="board-title-edit">
            <input
              type="text"
              value={editingName}
              onChange={(event) => setEditingName(event.target.value)}
              disabled={savingName}
            />
            <div className="board-item-actions">
              <button
                type="button"
                className="ghost"
                onClick={() => {
                  setIsEditingName(false);
                  setEditingName(board?.name ?? '');
                }}
                disabled={savingName}
              >
                Cancelar
              </button>
              <button type="button" className="primary" onClick={handleNameSave} disabled={savingName}>
                {savingName ? 'Salvando...' : 'Salvar'}
              </button>
            </div>
          </div>
        ) : (
          <>
            <h1>{board?.name ?? 'Board'}</h1>
            {board && (
              <button
                type="button"
                className="secondary"
                onClick={() => setIsEditingName(true)}
              >
                Edit name
              </button>
            )}
          </>
        )}
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
        <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
          <div className={`kanban-grid${isMoving ? ' is-moving' : ''}`}>
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
                  isBusy={isMoving}
                >
                  <SortableContext items={cards.map((card) => card.id)} strategy={verticalListSortingStrategy}>
                    {cards.length === 0 ? (
                      <div className="kanban-card placeholder-card">Nenhum card.</div>
                    ) : (
                      cards.map((card) => (
                        <KanbanCard
                          key={card.id}
                          card={card}
                          onDelete={handleDeleteCard}
                          onMoveRequest={setMovingCard}
                          disabled={isMoving}
                        />
                      ))
                    )}
                  </SortableContext>
                </KanbanColumn>
              );
            })}
          </div>
        </DndContext>
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
