import { GameCard } from './GameCard';
import { AppView } from '../App';
import { 
  Gamepad2, Calculator, Snake, Brain,
  type LucideIcon 
} from 'lucide-react';

interface GameInfo {
  id: AppView;
  title: string;
  description: string;
  icon: LucideIcon;
  color: string;
}

const games: GameInfo[] = [
  {
    id: 'tictactoe',
    title: 'Tic Tac Toe',
    description: 'The classic game of X's and O's',
    icon: Gamepad2,
    color: 'from-blue-500 to-blue-600'
  },
  {
    id: 'calculator',
    title: 'Calculator',
    description: 'A beautiful and functional calculator',
    icon: Calculator,
    color: 'from-purple-500 to-purple-600'
  },
  {
    id: 'snake',
    title: 'Snake Game',
    description: 'The classic Nokia snake game',
    icon: Snake,
    color: 'from-green-500 to-green-600'
  },
  {
    id: 'memory',
    title: 'Memory Match',
    description: 'Test your memory with card matching',
    icon: Brain,
    color: 'from-pink-500 to-pink-600'
  }
];

interface GameMenuProps {
  onSelectGame: (game: AppView) => void;
}

export const GameMenu = ({ onSelectGame }: GameMenuProps) => {
  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
        Mini Games & Tools
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {games.map((game) => (
          <GameCard
            key={game.id}
            game={game}
            onClick={() => onSelectGame(game.id)}
          />
        ))}
      </div>
    </div>
  );
};