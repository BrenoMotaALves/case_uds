import type { Card } from '../api/types';

type KanbanCardProps = {
  card: Card;
  onDelete: (cardId: string) => void;
  onMoveRequest: (card: Card) => void;
};

const KanbanCard = ({ card, onDelete, onMoveRequest }: KanbanCardProps) => {
  return (
    <div className="kanban-card">
      <div className="kanban-card-title">{card.title}</div>
      {card.description && <p className="kanban-card-desc">{card.description}</p>}
      <div className="kanban-card-actions">
        <button type="button" className="ghost" onClick={() => onMoveRequest(card)}>
          Move
        </button>
        <button type="button" className="danger" onClick={() => onDelete(card.id)}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default KanbanCard;
