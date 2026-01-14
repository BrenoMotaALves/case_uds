import { Route, Routes } from 'react-router-dom';
import BoardsList from './pages/BoardsList';
import BoardKanban from './pages/BoardKanban';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<BoardsList />} />
      <Route path="/boards/:id" element={<BoardKanban />} />
    </Routes>
  );
};

export default App;