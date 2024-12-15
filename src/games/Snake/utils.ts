import { Direction } from './constants';

export interface Position {
  x: number;
  y: number;
}

export const moveSnake = (snake: Position[], direction: Direction): Position[] => {
  const head = snake[0];
  const newHead = { ...head };

  switch (direction) {
    case 'UP':
      newHead.y -= 1;
      break;
    case 'DOWN':
      newHead.y += 1;
      break;
    case 'LEFT':
      newHead.x -= 1;
      break;
    case 'RIGHT':
      newHead.x += 1;
      break;
  }

  return [newHead, ...snake];
};

export const generateFood = (snake: Position[]): Position => {
  const food: Position = {
    x: Math.floor(Math.random() * 20),
    y: Math.floor(Math.random() * 20)
  };

  // Regenerate if food spawns on snake
  if (snake.some(pos => pos.x === food.x && pos.y === food.y)) {
    return generateFood(snake);
  }

  return food;
};

export const checkCollision = (head: Position, body: Position[]): boolean => {
  return body.some(segment => segment.x === head.x && segment.y === head.y);
};