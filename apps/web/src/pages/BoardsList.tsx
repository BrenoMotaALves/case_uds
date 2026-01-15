import { useEffect, useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { createBoard, listBoards, updateBoard } from '../api/boards';
import type { BoardSummary } from '../api/types';

const BoardsList = () => {
  const [boards, setBoards] = useState<BoardSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [name, setName] = useState('');
  const [creating, setCreating] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingName, setEditingName] = useState('');
  const [savingId, setSavingId] = useState<string | null>(null);

  const fetchBoards = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await listBoards();
      setBoards(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Falha ao carregar boards.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBoards();
  }, []);

  const handleCreate = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!name.trim()) {
      return;
    }
    setCreating(true);
    setError('');
    try {
      await createBoard(name.trim());
      setName('');
      await fetchBoards();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Falha ao criar board.');
    } finally {
      setCreating(false);
    }
  };

  const handleEditStart = (board: BoardSummary) => {
    setEditingId(board.id);
    setEditingName(board.name);
    setError('');
  };

  const handleEditCancel = () => {
    setEditingId(null);
    setEditingName('');
  };

  const handleEditSave = async (boardId: string) => {
    if (!editingName.trim()) {
      setError('Nome do board obrigatorio.');
      return;
    }
    setSavingId(boardId);
    setError('');
    try {
      await updateBoard(boardId, { name: editingName.trim() });
      setEditingId(null);
      setEditingName('');
      await fetchBoards();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Falha ao atualizar board.');
    } finally {
      setSavingId(null);
    }
  };

  return (
    <div className="page">
      <header className="page-header">
        <h1>Boards</h1>
      </header>

      <form className="form" onSubmit={handleCreate}>
        <input
          type="text"
          name="name"
          placeholder="Nome do board"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
        <button type="submit" className="primary" disabled={creating}>
          {creating ? 'Criando...' : 'Create'}
        </button>
      </form>

      {error && <p className="error-text">{error}</p>}

      {loading ? (
        <p>Loading...</p>
      ) : boards.length === 0 ? (
        <section className="placeholder">
          <p>Nenhum board conectado ainda.</p>
        </section>
      ) : (
        <ul className="board-list">
          {boards.map((board) => {
            const isEditing = editingId === board.id;
            const isSaving = savingId === board.id;
            return (
              <li key={board.id} className="board-item">
                {isEditing ? (
                  <div className="board-item-edit">
                    <input
                      type="text"
                      value={editingName}
                      onChange={(event) => setEditingName(event.target.value)}
                    />
                    <div className="board-item-actions">
                      <button
                        type="button"
                        className="ghost"
                        onClick={handleEditCancel}
                        disabled={isSaving}
                      >
                        Cancelar
                      </button>
                      <button
                        type="button"
                        className="primary"
                        onClick={() => handleEditSave(board.id)}
                        disabled={isSaving}
                      >
                        {isSaving ? 'Salvando...' : 'Salvar'}
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="board-item-row">
                    <Link to={`/boards/${board.id}`}>{board.name}</Link>
                    <div className="board-item-actions">
                      <button
                        type="button"
                        className="secondary"
                        onClick={() => handleEditStart(board)}
                        disabled={creating || Boolean(savingId)}
                      >
                        Edit
                      </button>
                    </div>
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default BoardsList;
