import { useEffect, useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { createBoard, listBoards } from '../api/boards';
import type { BoardSummary } from '../api/types';

const BoardsList = () => {
  const [boards, setBoards] = useState<BoardSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [name, setName] = useState('');
  const [creating, setCreating] = useState(false);

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
        <p>Carregando boards...</p>
      ) : boards.length === 0 ? (
        <section className="placeholder">
          <p>Nenhum board conectado ainda.</p>
        </section>
      ) : (
        <ul className="board-list">
          {boards.map((board) => (
            <li key={board.id} className="board-item">
              <Link to={`/boards/${board.id}`}>{board.name}</Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default BoardsList;
