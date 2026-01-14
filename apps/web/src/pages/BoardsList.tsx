import { Link } from 'react-router-dom';

const BoardsList = () => {
  return (
    <div className="page">
      <header className="page-header">
        <h1>Boards</h1>
        <button type="button" className="primary">Novo Board</button>
      </header>

      <section className="placeholder">
        <p>Nenhum board conectado ainda.</p>
        <Link to="/boards/1">Abrir board demo</Link>
      </section>
    </div>
  );
};

export default BoardsList;