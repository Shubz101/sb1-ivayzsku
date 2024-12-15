import { RefreshCw } from 'lucide-react';

interface WinnerModalProps {
  winner: string | null;
  onRestart: () => void;
}

const WinnerModal = ({ winner, onRestart }: WinnerModalProps) => {
  if (!winner) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-2xl text-center shadow-2xl">
        <h2 className="text-3xl font-bold mb-4">
          {winner === 'draw' ? "It's a Draw!" : `Player ${winner} Wins!`}
        </h2>
        
        <button 
          onClick={onRestart}
          className="
            bg-blue-500 text-white px-6 py-3 rounded-full 
            flex items-center justify-center mx-auto 
            hover:bg-blue-600 transition-colors 
            transform hover:scale-105 mt-4
          "
        >
          <RefreshCw className="mr-2" />
          Restart Game
        </button>
      </div>
    </div>
  );
};

export default WinnerModal;