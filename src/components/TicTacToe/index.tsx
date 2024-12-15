import { useState, useEffect } from 'react';
import { PlayCircle } from 'lucide-react';
import Board from './Board';
import PlayerIndicator from './PlayerIndicator';
import WinnerModal from './WinnerModal';
import { checkWinner } from '../../utils/gameLogic';
import { useSoundEffects } from '../../hooks/useSoundEffects';

const TicTacToe = () => {
  const [board, setBoard] = useState<(string | null)[]>(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState('X');
  const [winner, setWinner] = useState<string | null>(null);
  const [gameStarted, setGameStarted] = useState(false);
  const { playClickSound, playWinSound } = useSoundEffects();

  const handleCellClick = (index: number) => {
    if (!gameStarted || board[index] || winner) return;

    const newBoard = [...board];
    newBoard[index] = currentPlayer;
    setBoard(newBoard);

    playClickSound();

    const gameResult = checkWinner(newBoard);
    if (gameResult) {
      if (gameResult !== 'draw') {
        setWinner(gameResult);
        playWinSound();
      } else {
        setWinner('draw');
      }
    } else {
      setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
    }
  };

  const restartGame = () => {
    setBoard(Array(9).fill(null));
    setCurrentPlayer('X');
    setWinner(null);
    setGameStarted(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex flex-col items-center justify-center p-4">
      <div className="bg-white shadow-2xl rounded-2xl p-6 w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
          Tic Tac Toe
        </h1>

        {!gameStarted ? (
          <div className="text-center">
            <button 
              onClick={() => setGameStarted(true)}
              className="
                bg-blue-500 text-white px-6 py-3 rounded-full 
                flex items-center justify-center mx-auto 
                hover:bg-blue-600 transition-colors 
                transform hover:scale-105
              "
            >
              <PlayCircle className="mr-2" />
              Start Game
            </button>
          </div>
        ) : (
          <>
            <Board board={board} onCellClick={handleCellClick} />
            <PlayerIndicator currentPlayer={currentPlayer} />
          </>
        )}

        <WinnerModal winner={winner} onRestart={restartGame} />
      </div>
    </div>
  );
};

export default TicTacToe;