import { useState } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import type { Card } from '../api/types';

type KanbanCardProps = {
  card: Card;
  onDelete: (cardId: string) => Promise<void>;
  onMoveRequest: (card: Card) => void;
  disabled?: boolean;
};

const KanbanCard = ({ card, onDelete, onMoveRequest, disabled = false }: KanbanCardProps) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({
    id: card.id,
    data: { columnId: card.columnId },
    disabled: disabled || isDeleting
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition
  };

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
    <div
      ref={setNodeRef}
      className={`kanban-card draggable${isDragging ? ' dragging' : ''}`}
      style={style}
      {...attributes}
      {...listeners}
    >
      <div className="kanban-card-title">{card.title}</div>
      {card.description && <p className="kanban-card-desc">{card.description}</p>}
      <div className="kanban-card-actions">
        <button
          type="button"
          className="ghost"
          onClick={() => onMoveRequest(card)}
          disabled={isDeleting || disabled}
        >
          Move
        </button>
        <button type="button" className="danger" onClick={handleDelete} disabled={isDeleting || disabled}>
          {isDeleting ? 'Deleting...' : 'Delete'}
        </button>
      </div>
    </div>
  );
};

export default KanbanCard;
