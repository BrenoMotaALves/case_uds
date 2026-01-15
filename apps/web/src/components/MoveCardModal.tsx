import { useEffect, useState, type FormEvent } from 'react';
import type { Card, Column } from '../api/types';

type MoveCardModalProps = {
  isOpen: boolean;
  columns: Column[];
  card: Card | null;
  onClose: () => void;
  onConfirm: (newColumnId: string) => void;
};

const MoveCardModal = ({ isOpen, columns, card, onClose, onConfirm }: MoveCardModalProps) => {
  const [selectedColumnId, setSelectedColumnId] = useState('');

  useEffect(() => {
    if (isOpen) {
      setSelectedColumnId(columns[0]?.id ?? '');
    }
  }, [isOpen, columns]);

  if (!isOpen || !card) {
    return null;
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (selectedColumnId) {
      onConfirm(selectedColumnId);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h3>Mover card</h3>
        <p className="modal-subtitle">{card.title}</p>
        <form className="form form-compact" onSubmit={handleSubmit}>
          <select
            value={selectedColumnId}
            onChange={(event) => setSelectedColumnId(event.target.value)}
          >
            {columns.map((column) => (
              <option key={column.id} value={column.id}>
                {column.name}
              </option>
            ))}
          </select>
          <div className="modal-actions">
            <button type="button" className="ghost" onClick={onClose}>
              Cancelar
            </button>
            <button type="submit" className="primary" disabled={!selectedColumnId}>
              Confirmar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MoveCardModal;
