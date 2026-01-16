import type { BoardSummary } from '../api/types';

type BoardSwitcherProps = {
  boards: BoardSummary[];
  value: string;
  onChange: (id: string) => void;
  disabled?: boolean;
};

const BoardSwitcher = ({ boards, value, onChange, disabled = false }: BoardSwitcherProps) => {
  return (
    <select
      className="board-switcher"
      value={value}
      onChange={(event) => onChange(event.target.value)}
      disabled={disabled}
    >
      {boards.map((board) => (
        <option key={board.id} value={board.id}>
          {board.name}
        </option>
      ))}
    </select>
  );
};

export default BoardSwitcher;
