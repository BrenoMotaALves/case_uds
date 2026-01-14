import KanbanColumn from '../components/KanbanColumn';

const BoardKanban = () => {
  return (
    <div className="page">
      <header className="page-header">
        <h1>Demo Board</h1>
      </header>

      <div className="kanban-grid">
        <KanbanColumn title="To Do" />
        <KanbanColumn title="In Progress" />
        <KanbanColumn title="Done" />
      </div>
    </div>
  );
};

export default BoardKanban;