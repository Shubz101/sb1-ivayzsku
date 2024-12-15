import { useState, useEffect, useCallback } from 'react';
import { BackButton } from '../../components/BackButton';
import { useGameLoop } from '../../hooks/useGameLoop';
import { GRID_SIZE, INITIAL_SNAKE, Direction } from './constants';
import { 
  moveSnake, 
  generateFood, 
  checkCollision,
  type Position 
} from './utils';

interface SnakeProps {
  onBack: () => void;
}

export const Snake = ({ onBack }: SnakeProps) => {
  const [snake, setSnake] = useState(INITIAL_SNAKE);
  const [food, setFood] = useState(generateFood(INITIAL_SNAKE));
  const [direction, setDirection] = useState<Direction>('RIGHT');
  const [isGameOver, setIsGameOver] = useState(false);
  const [score, setScore] = useState(0);

  const handleKeyPress = useCallback((e: KeyboardEvent) => {
    switch (e.key) {
      case 'ArrowUp':
        setDirection(prev => prev !== 'DOWN' ? 'UP' : prev);
        break;
      case 'ArrowDown':
        setDirection(prev => prev !== 'UP' ? 'DOWN' : prev);
        break;
      case 'ArrowLeft':
        setDirection(prev => prev !== 'RIGHT' ? 'LEFT' : prev);
        break;
      case 'ArrowRight':
        setDirection(prev => prev !== 'LEFT' ? 'RIGHT' : prev);
        break;
    }
  }, []);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [handleKeyPress]);

  const gameLoop = useCallback(() => {
    if (isGameOver) return;

    const newSnake = moveSnake(snake, direction);
    const head = newSnake[0];

    // Check collisions
    if (checkCollision(head, newSnake.slice(1)) || 
        head.x < 0 || head.x >= GRID_SIZE || 
        head.y < 0 || head.y >= GRID_SIZE) {
      setIsGameOver(true);
      return;
    }

    // Check if snake ate food
    if (head.x === food.x && head.y === food.y) {
      setScore(s => s + 1);
      setFood(generateFood(newSnake));
    } else {
      newSnake.pop();
    }

    setSnake(newSnake);
  }, [snake, direction, food, isGameOver]);

  useGameLoop(gameLoop, 150);

  const resetGame = () => {
    setSnake(INITIAL_SNAKE);
    setFood(generateFood(INITIAL_SNAKE));
    setDirection('RIGHT');
    setIsGameOver(false);
    setScore(0);
  };

  return (
    <div className="relative flex flex-col items-center justify-center min-h-[80vh]">
      <BackButton onClick={onBack} />
      
      <h1 className="text-3xl font-bold mb-8">Snake Game</h1>
      
      <div className="bg-white p-4 rounded-xl shadow-2xl">
        <div 
          className="grid gap-1 bg-gray-100 p-2 rounded-lg"
          style={{
            gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)`,
            width: `${GRID_SIZE * 20}px`
          }}
        >
          {Array.from({ length: GRID_SIZE * GRID_SIZE }).map((_, i) => {
            const x = i % GRID_SIZE;
            const y = Math.floor(i / GRID_SIZE);
            const isSnake = snake.some(pos => pos.x === x && pos.y === y);
            const isFood = food.x === x && food.y === y;
            
            return (
              <div
                key={i}
                className={`w-5 h-5 rounded-sm ${
                  isSnake ? 'bg-green-500' :
                  isFood ? 'bg-red-500' :
                  'bg-gray-200'
                }`}
              />
            );
          })}
        </div>
      </div>

      <div className="mt-6 text-xl font-semibold">
        Score: {score}
      </div>

      {isGameOver && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-2xl text-center">
            <h2 className="text-3xl font-bold mb-4">Game Over!</h2>
            <p className="text-xl mb-6">Final Score: {score}</p>
            <button
              onClick={resetGame}
              className="bg-green-500 text-white px-6 py-3 rounded-full
                hover:bg-green-600 transition-colors"
            >
              Play Again
            </button>
          </div>
        </div>
      )}
    </div>
  );
};