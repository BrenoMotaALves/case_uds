import { useState } from 'react';
import type { Card } from '../api/types';

type KanbanCardProps = {
  card: Card;
  onDelete: (cardId: string) => Promise<void>;
  onMoveRequest: (card: Card) => void;
};

const KanbanCard = ({ card, onDelete, onMoveRequest }: KanbanCardProps) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    const confirmed = window.confirm('Deseja remover este card?');
    if (!confirmed) {
      return;
    }
    setIsDeleting(true);
    try {
      await onDelete(card.id);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="kanban-card">
      <div className="kanban-card-title">{card.title}</div>
      {card.description && <p className="kanban-card-desc">{card.description}</p>}
      <div className="kanban-card-actions">
        <button type="button" className="ghost" onClick={() => onMoveRequest(card)} disabled={isDeleting}>
          Move
        </button>
        <button type="button" className="danger" onClick={handleDelete} disabled={isDeleting}>
          {isDeleting ? 'Deleting...' : 'Delete'}
        </button>
      </div>
    </div>
  );
};

export default KanbanCard;
