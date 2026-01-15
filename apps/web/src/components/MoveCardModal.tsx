import { useEffect, useState, type FormEvent } from 'react';
import type { Card, Column } from '../api/types';

type MoveCardModalProps = {
  isOpen: boolean;
  columns: Column[];
  card: Card | null;
  onClose: () => void;
  onConfirm: (newColumnId: string) => Promise<void>;
};

const MoveCardModal = ({ isOpen, columns, card, onClose, onConfirm }: MoveCardModalProps) => {
  const [selectedColumnId, setSelectedColumnId] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isOpen) {
      const availableColumns = columns.filter((column) => column.id !== card?.columnId);
      setSelectedColumnId(availableColumns[0]?.id ?? '');
    }
  }, [isOpen, columns, card]);

  if (!isOpen || !card) {
    return null;
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!selectedColumnId) {
      return;
    }
    setIsSubmitting(true);
    try {
      await onConfirm(selectedColumnId);
      setSelectedColumnId('');
      onClose();
    } finally {
      setIsSubmitting(false);
    }
  };

  const availableColumns = columns.filter((column) => column.id !== card.columnId);

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h3>Mover card</h3>
        <p className="modal-subtitle">{card.title}</p>
        <form className="form form-compact" onSubmit={handleSubmit}>
          <select
            value={selectedColumnId}
            onChange={(event) => setSelectedColumnId(event.target.value)}
            disabled={isSubmitting}
          >
            {availableColumns.map((column) => (
              <option key={column.id} value={column.id}>
                {column.name}
              </option>
            ))}
          </select>
          {availableColumns.length === 0 && <p>Nenhuma outra coluna disponivel.</p>}
          <div className="modal-actions">
            <button type="button" className="ghost" onClick={onClose} disabled={isSubmitting}>
              Cancelar
            </button>
            <button type="submit" className="primary" disabled={!selectedColumnId || isSubmitting}>
              Confirmar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MoveCardModal;
