import { LucideIcon } from 'lucide-react';
import { AppView } from '../App';

interface GameInfo {
  id: AppView;
  title: string;
  description: string;
  icon: LucideIcon;
  color: string;
}

interface GameCardProps {
  game: GameInfo;
  onClick: () => void;
}

export const GameCard = ({ game, onClick }: GameCardProps) => {
  return (
    <button
      onClick={onClick}
      className="w-full bg-white rounded-xl shadow-xl hover:shadow-2xl 
        transition-all duration-300 transform hover:-translate-y-1"
    >
      <div className="p-6">
        <div className={`w-14 h-14 rounded-lg bg-gradient-to-br ${game.color} 
          flex items-center justify-center mb-4`}
        >
          <game.icon className="text-white" size={28} />
        </div>
        
        <h2 className="text-2xl font-bold text-left text-gray-800 mb-2">
          {game.title}
        </h2>
        
        <p className="text-gray-600 text-left">
          {game.description}
        </p>
      </div>
    </button>
  );
};