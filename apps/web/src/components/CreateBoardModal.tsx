import { useEffect, useState, type FormEvent } from 'react';
import { createBoard } from '../api/boards';

type CreateBoardModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onCreated: (boardId: string) => void;
};

const CreateBoardModal = ({ isOpen, onClose, onCreated }: CreateBoardModalProps) => {
  const [name, setName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isOpen) {
      setName('');
      setError('');
    }
  }, [isOpen]);

  if (!isOpen) {
    return null;
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!name.trim()) {
      setError('Nome do board obrigatorio.');
      return;
    }
    setIsSubmitting(true);
    setError('');
    try {
      const created = await createBoard(name.trim());
      onCreated(created.id);
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Falha ao criar board.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h3>Novo board</h3>
        <form className="form form-compact" onSubmit={handleSubmit}>
          <input
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Nome do board"
            disabled={isSubmitting}
          />
          {error && <p className="error-text">{error}</p>}
          <div className="modal-actions">
            <button type="button" className="ghost" onClick={onClose} disabled={isSubmitting}>
              Cancelar
            </button>
            <button type="submit" className="primary" disabled={isSubmitting}>
              {isSubmitting ? 'Criando...' : 'Criar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateBoardModal;
