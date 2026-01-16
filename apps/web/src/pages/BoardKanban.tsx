import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { DndContext, PointerSensor, useSensor, useSensors, type DragEndEvent } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { deleteBoard, getBoard, listBoards, updateBoard } from '../api/boards';
import { createCard, deleteCard, moveCard } from '../api/cards';
import type { BoardDetail, BoardSummary, Card } from '../api/types';
import BoardSwitcher from '../components/BoardSwitcher';
import KanbanCard from '../components/KanbanCard';
import KanbanColumn from '../components/KanbanColumn';
import CreateBoardModal from '../components/CreateBoardModal';
import MoveCardModal from '../components/MoveCardModal';

const BoardKanban = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [board, setBoard] = useState<BoardDetail | null>(null);
  const [boards, setBoards] = useState<BoardSummary[]>([]);
  const [loadingBoards, setLoadingBoards] = useState(true);
  const [errorBoards, setErrorBoards] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [notFound, setNotFound] = useState(false);
  const [status, setStatus] = useState('');
  const [movingCard, setMovingCard] = useState<Card | null>(null);
  const [isEditingName, setIsEditingName] = useState(false);
  const [editingName, setEditingName] = useState('');
  const [savingName, setSavingName] = useState(false);
  const [isMoving, setIsMoving] = useState(false);
  const [isMutating, setIsMutating] = useState(false);
  const [isDeletingBoard, setIsDeletingBoard] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 8 }
    })
  );

  const fetchBoard = async () => {
    if (!id) {
      setError('Board nao encontrado.');
      setNotFound(true);
      setLoading(false);
      return;
    }
    setLoading(true);
    setError('');
    setNotFound(false);
    try {
      const data = await getBoard(id);
      setBoard(data);
      setEditingName(data.name);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Falha ao carregar board.';
      setError(message);
      setNotFound(message.toLowerCase().includes('not found') || message.includes('404'));
      setBoard(null);
    } finally {
      setLoading(false);
    }
  };

  const fetchBoards = async () => {
    setLoadingBoards(true);
    setErrorBoards('');
    try {
      const data = await listBoards();
      setBoards(data);
    } catch (err) {
      setErrorBoards(err instanceof Error ? err.message : 'Falha ao carregar boards.');
    } finally {
      setLoadingBoards(false);
    }
  };

  useEffect(() => {
    fetchBoard();
  }, [id]);

  useEffect(() => {
    fetchBoards();
  }, []);

  const handleCreateCard = async (
    columnId: string,
    payload: { title: string; description?: string }
  ) => {
    setIsMutating(true);
    setStatus('Saving...');
    try {
      await createCard(columnId, payload);
      await fetchBoard();
    } finally {
      setStatus('');
      setIsMutating(false);
    }
  };

  const handleDeleteCard = async (cardId: string) => {
    setIsMutating(true);
    setStatus('Deleting...');
    try {
      await deleteCard(cardId);
      await fetchBoard();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Falha ao remover card.');
    } finally {
      setStatus('');
      setIsMutating(false);
    }
  };

  const handleMoveConfirm = async (newColumnId: string) => {
    if (!movingCard) {
      return;
    }
    setIsMutating(true);
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
      setIsMutating(false);
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
    setIsMutating(true);
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
      setIsMutating(false);
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

  const handleDeleteBoard = async () => {
    if (!board) {
      return;
    }
    const confirmed = window.confirm(`Deseja remover o board "${board.name}"?`);
    if (!confirmed) {
      return;
    }
    setIsDeletingBoard(true);
    setError('');
    try {
      await deleteBoard(board.id);
      navigate('/');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Falha ao remover board.');
    } finally {
      setIsDeletingBoard(false);
    }
  };

  const handleBoardChange = (boardId: string) => {
    if (!boardId) {
      return;
    }
    navigate(`/boards/${boardId}`);
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
                disabled={savingName || isMutating}
              >
                Cancelar
              </button>
              <button
                type="button"
                className="primary"
                onClick={handleNameSave}
                disabled={savingName || isMutating}
              >
                {savingName ? 'Salvando...' : 'Salvar'}
              </button>
            </div>
          </div>
        ) : (
          <>
            <h1>{board?.name ?? 'Board'}</h1>
            {board && (
              <div className="board-item-actions">
                {errorBoards ? (
                  <button type="button" className="secondary" onClick={() => navigate('/')}>
                    Voltar
                  </button>
                ) : loadingBoards ? (
                  <span>Carregando boards...</span>
                ) : boards.length === 0 ? (
                  <button
                    type="button"
                    className="secondary"
                    onClick={() => setIsCreateModalOpen(true)}
                    disabled={isDeletingBoard || isMutating}
                  >
                    Criar board
                  </button>
                ) : (
                  <BoardSwitcher
                    boards={boards}
                    value={id ?? ''}
                    onChange={handleBoardChange}
                    disabled={isDeletingBoard || isMutating}
                  />
                )}
                <button type="button" className="secondary" onClick={() => navigate('/')}>
                  Boards
                </button>
                <button
                  type="button"
                  className="secondary"
                  onClick={() => setIsCreateModalOpen(true)}
                  disabled={isDeletingBoard || isMutating}
                >
                  Novo Board
                </button>
                <button
                  type="button"
                  className="secondary"
                  onClick={() => setIsEditingName(true)}
                  disabled={isDeletingBoard || isMutating}
                >
                  Edit name
                </button>
                <button
                  type="button"
                  className="danger"
                  onClick={handleDeleteBoard}
                  disabled={isDeletingBoard || isMutating}
                >
                  {isDeletingBoard ? 'Deletando...' : 'Delete Board'}
                </button>
              </div>
            )}
          </>
        )}
      </header>

      {status && <p>{status}</p>}
      {error && <p className="error-text">{error}</p>}

      {loading ? (
        <p>Loading...</p>
      ) : notFound ? (
        <section className="placeholder">
          <p>Board nao encontrado.</p>
          <button type="button" className="secondary" onClick={() => navigate('/')}>
            Voltar
          </button>
        </section>
      ) : !loadingBoards && boards.length === 0 ? (
        <section className="placeholder">
          <p>Nenhum board encontrado.</p>
          <button type="button" className="primary" onClick={() => setIsCreateModalOpen(true)}>
            Criar board
          </button>
        </section>
      ) : !board || sortedColumns.length === 0 ? (
        <section className="placeholder">
          <p>Nenhuma coluna encontrada para este board.</p>
          <button type="button" className="primary" onClick={() => setIsCreateModalOpen(true)}>
            Novo Board
          </button>
        </section>
      ) : (
        <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
          <div className={`kanban-grid${isMoving ? ' is-moving' : ''}`}>
            {!hasCards && (
              <div className="placeholder">
                <p>Sem cards ainda. Crie o primeiro card em uma das colunas.</p>
                <button type="button" className="secondary" onClick={() => setIsCreateModalOpen(true)}>
                  Novo Board
                </button>
              </div>
            )}
            {sortedColumns.map((column) => {
              const cards = [...column.cards].sort((a, b) => a.position - b.position);
              return (
                <KanbanColumn
                  key={column.id}
                  column={column}
                  onCreateCard={handleCreateCard}
                  isBusy={isMoving || isMutating}
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
                          disabled={isMoving || isMutating}
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

      <CreateBoardModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onCreated={(boardId) => {
          fetchBoards();
          navigate(`/boards/${boardId}`);
        }}
      />
    </div>
  );
};

export default BoardKanban;
