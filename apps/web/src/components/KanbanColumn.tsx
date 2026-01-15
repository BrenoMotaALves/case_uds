import { useState, type FormEvent, type ReactNode } from 'react';
import { useDroppable } from '@dnd-kit/core';
import type { Column } from '../api/types';

type KanbanColumnProps = {
  column: Column;
  onCreateCard: (columnId: string, payload: { title: string; description?: string }) => Promise<void>;
  children: ReactNode;
  isBusy?: boolean;
};

const KanbanColumn = ({ column, onCreateCard, children, isBusy = false }: KanbanColumnProps) => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const { setNodeRef, isOver } = useDroppable({
    id: column.id,
    data: { columnId: column.id }
  });

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!title.trim()) {
      setError('Titulo obrigatorio.');
      return;
    }
    setSaving(true);
    setError('');
    try {
      await onCreateCard(column.id, {
        title: title.trim(),
        description: description.trim() ? description.trim() : undefined
      });
      setTitle('');
      setDescription('');
      setIsFormOpen(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Falha ao criar card.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div ref={setNodeRef} className={`kanban-column${isOver ? ' is-over' : ''}`}>
      <div className="kanban-column-header">
        <h2>{column.name}</h2>
        <button
          type="button"
          className="secondary"
          onClick={() => setIsFormOpen(true)}
          disabled={saving || isBusy}
        >
          Add Card
        </button>
      </div>
      {isFormOpen && (
        <form className="form form-compact" onSubmit={handleSubmit}>
          <input
            type="text"
            name="title"
            placeholder="Titulo do card"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            disabled={saving || isBusy}
          />
          <textarea
            name="description"
            placeholder="Descricao (opcional)"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            rows={3}
            disabled={saving || isBusy}
          />
          <div className="form-actions">
            <button
              type="button"
              className="ghost"
              onClick={() => setIsFormOpen(false)}
              disabled={saving || isBusy}
            >
              Cancelar
            </button>
            <button type="submit" className="primary" disabled={saving || isBusy}>
              {saving ? 'Salvando...' : 'Salvar'}
            </button>
          </div>
        </form>
      )}
      {error && <p className="error-text">{error}</p>}
      <div className="kanban-cards">{children}</div>
    </div>
  );
};

export default KanbanColumn;
