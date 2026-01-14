type KanbanColumnProps = {
  title: string;
};

const KanbanColumn = ({ title }: KanbanColumnProps) => {
  return (
    <div className="kanban-column">
      <h2>{title}</h2>
      <div className="kanban-card placeholder-card">Arraste cards aqui</div>
    </div>
  );
};

export default KanbanColumn;