import { useState, useEffect } from 'react';
import { BackButton } from '../../components/BackButton';
import { 
  Gamepad, Heart, Star, Zap, 
  Music, Camera, Coffee, Sun,
  type LucideIcon 
} from 'lucide-react';

interface Card {
  id: number;
  icon: LucideIcon;
  isFlipped: boolean;
  isMatched: boolean;
}

const icons = [Gamepad, Heart, Star, Zap, Music, Camera, Coffee, Sun];
const createDeck = () => {
  const cards = [...icons, ...icons].map((Icon, index) => ({
    id: index,
    icon: Icon,
    isFlipped: false,
    isMatched: false
  }));

  // Shuffle cards
  return cards.sort(() => Math.random() - 0.5);
};

interface MemoryProps {
  onBack: () => void;
}

export const Memory = ({ onBack }: MemoryProps) => {
  const [cards, setCards] = useState<Card[]>(createDeck());
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [isWon, setIsWon] = useState(false);

  useEffect(() => {
    if (flippedCards.length === 2) {
      const [first, second] = flippedCards;
      const firstCard = cards[first];
      const secondCard = cards[second];

      if (firstCard.icon === secondCard.icon) {
        // Match found
        setCards(cards.map((card, index) => 
          index === first || index === second
            ? { ...card, isMatched: true }
            : card
        ));
      }

      // Reset flipped cards after a delay
      setTimeout(() => {
        setFlippedCards([]);
      }, 1000);

      setMoves(m => m + 1);
    }
  }, [flippedCards, cards]);

  useEffect(() => {
    if (cards.every(card => card.isMatched)) {
      setIsWon(true);
    }
  }, [cards]);

  const handleCardClick = (index: number) => {
    if (
      flippedCards.length === 2 || 
      flippedCards.includes(index) || 
      cards[index].isMatched
    ) return;

    setFlippedCards([...flippedCards, index]);
    setCards(cards.map((card, i) => 
      i === index ? { ...card, isFlipped: true } : card
    ));
  };

  const resetGame = () => {
    setCards(createDeck());
    setFlippedCards([]);
    setMoves(0);
    setIsWon(false);
  };

  return (
    <div className="relative flex flex-col items-center justify-center min-h-[80vh]">
      <BackButton onClick={onBack} />
      
      <h1 className="text-3xl font-bold mb-8">Memory Match</h1>
      
      <div className="bg-white p-6 rounded-xl shadow-2xl">
        <div className="grid grid-cols-4 gap-4 mb-4">
          {cards.map((card, index) => {
            const isFlipped = card.isMatched || 
              flippedCards.includes(index);
            const Icon = card.icon;

            return (
              <button
                key={card.id}
                onClick={() => handleCardClick(index)}
                className={`w-20 h-20 rounded-lg transition-all duration-300 
                  ${isFlipped 
                    ? 'bg-purple-500 text-white rotate-y-180' 
                    : 'bg-gray-100 hover:bg-gray-200'
                  }`}
                disabled={isFlipped}
              >
                {isFlipped && <Icon size={32} className="mx-auto" />}
              </button>
            );
          })}
        </div>

        <div className="text-center text-gray-700">
          Moves: {moves}
        </div>
      </div>

      {isWon && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-2xl text-center">
            <h2 className="text-3xl font-bold mb-4">Congratulations!</h2>
            <p className="text-xl mb-6">You won in {moves} moves!</p>
            <button
              onClick={resetGame}
              className="bg-purple-500 text-white px-6 py-3 rounded-full
                hover:bg-purple-600 transition-colors"
            >
              Play Again
            </button>
          </div>
        </div>
      )}
    </div>
  );
};