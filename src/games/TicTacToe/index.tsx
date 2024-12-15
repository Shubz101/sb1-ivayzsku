import { useState } from 'react';
import { X, Circle } from 'lucide-react';
import { BackButton } from '../../components/BackButton';
import { checkWinner } from './utils';

interface TicTacToeProps {
  onBack: () => void;
}

export const TicTacToe = ({ onBack }: TicTacToeProps) => {
  const [board, setBoard] = useState<(string | null)[]>(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState('X');
  const [winner, setWinner] = useState<string | null>(null);

  const handleCellClick = (index: number) => {
    if (board[index] || winner) return;

    const newBoard = [...board];
    newBoard[index] = currentPlayer;
    setBoard(newBoard);

    const gameResult = checkWinner(newBoard);
    if (gameResult) {
      setWinner(gameResult);
    } else {
      setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
    }
  };

  const restartGame = () => {
    setBoard(Array(9).fill(null));
    setCurrentPlayer('X');
    setWinner(null);
  };

  const renderCell = (index: number) => {
    const value = board[index];
    let cellColor = 'bg-blue-100 hover:bg-blue-200';
    
    if (value === 'X') {
      cellColor = 'bg-red-200 text-red-700';
    } else if (value === 'O') {
      cellColor = 'bg-green-200 text-green-700';
    }

    return (
      <button 
        key={index}
        onClick={() => handleCellClick(index)}
        className={`
          w-full h-24 rounded-lg flex items-center justify-center
          transition-all duration-300 transform hover:scale-105
          ${cellColor}
        `}
        disabled={!!winner}
      >
        {value === 'X' && <X size={48} />}
        {value === 'O' && <Circle size={48} />}
      </button>
    );
  };

  return (
    <div className="relative flex flex-col items-center justify-center min-h-[80vh]">
      <BackButton onClick={onBack} />
      
      <h1 className="text-3xl font-bold mb-8">Tic Tac Toe</h1>
      
      <div className="bg-white p-6 rounded-xl shadow-2xl">
        <div className="grid grid-cols-3 gap-4 mb-6">
          {[0, 1, 2, 3, 4, 5, 6, 7, 8].map(renderCell)}
        </div>

        <div className="flex items-center justify-center space-x-2">
          <span className="text-xl font-semibold">Current Player:</span>
          {currentPlayer === 'X' 
            ? <X className="text-red-500" size={32} />
            : <Circle className="text-green-500" size={32} />
          }
        </div>
      </div>

      {winner && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-2xl text-center">
            <h2 className="text-3xl font-bold mb-4">
              {winner === 'draw' 
                ? "It's a Draw!" 
                : `Player ${winner} Wins!`}
            </h2>
            
            <button 
              onClick={restartGame}
              className="bg-blue-500 text-white px-6 py-3 rounded-full
                hover:bg-blue-600 transition-colors"
            >
              Play Again
            </button>
          </div>
        </div>
      )}
    </div>
  );
};