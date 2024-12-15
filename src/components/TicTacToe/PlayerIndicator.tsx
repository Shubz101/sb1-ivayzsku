import { X, Circle } from 'lucide-react';

interface PlayerIndicatorProps {
  currentPlayer: string;
}

const PlayerIndicator = ({ currentPlayer }: PlayerIndicatorProps) => {
  const getPlayerIcon = (player: string) => {
    return player === 'X' 
      ? <X className="text-red-500 mr-2" size={32} /> 
      : <Circle className="text-green-500 mr-2" size={32} />;
  };

  return (
    <div className="flex items-center justify-center mb-4">
      <span className="text-xl font-semibold flex items-center">
        {getPlayerIcon(currentPlayer)}
        Current Player
      </span>
    </div>
  );
};

export default PlayerIndicator;