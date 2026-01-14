type KanbanCardProps = {
  title: string;
};

const KanbanCard = ({ title }: KanbanCardProps) => {
  return <div className="kanban-card">{title}</div>;
};

export default KanbanCard;