import { X, Circle } from 'lucide-react';

interface BoardProps {
  board: (string | null)[];
  onCellClick: (index: number) => void;
}

const Board = ({ board, onCellClick }: BoardProps) => {
  const renderCell = (index: number) => {
    const value = board[index];
    let cellColor = 'bg-blue-100 hover:bg-blue-200';
    
    if (value === 'X') {
      cellColor = 'bg-red-200 text-red-700';
    } else if (value === 'O') {
      cellColor = 'bg-green-200 text-green-700';
    }

    return (
      <div 
        key={index}
        onClick={() => onCellClick(index)}
        className={`
          w-full h-24 border-2 border-gray-300 flex items-center 
          justify-center text-4xl font-bold cursor-pointer 
          transition-all duration-300 ease-in-out transform 
          hover:scale-105 ${cellColor}
        `}
      >
        {value === 'X' && <X size={64} />}
        {value === 'O' && <Circle size={64} />}
      </div>
    );
  };

  return (
    <div className="grid grid-cols-3 gap-2 mb-6">
      {[0, 1, 2, 3, 4, 5, 6, 7, 8].map(renderCell)}
    </div>
  );
};

export default Board;