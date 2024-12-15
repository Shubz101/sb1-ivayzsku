import React, { useState, useEffect } from 'react';
import { X, Circle, RefreshCw, PlayCircle } from 'lucide-react';

const TicTacToe = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState('X');
  const [winner, setWinner] = useState(null);
  const [gameStarted, setGameStarted] = useState(false);
  const [clickSound, setClickSound] = useState(null);
  const [winSound, setWinSound] = useState(null);

  // Load sound effects on component mount
  useEffect(() => {
    const clickAudio = new Audio('/api/placeholder/click-sound.mp3');
    const winAudio = new Audio('/api/placeholder/win-sound.mp3');
    setClickSound(clickAudio);
    setWinSound(winAudio);
  }, []);

  // Check for winner or draw
  const checkWinner = (boardState) => {
    const winPatterns = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
      [0, 4, 8], [2, 4, 6] // Diagonals
    ];

    for (let pattern of winPatterns) {
      const [a, b, c] = pattern;
      if (
        boardState[a] && 
        boardState[a] === boardState[b] && 
        boardState[a] === boardState[c]
      ) {
        return boardState[a];
      }
    }

    return boardState.every(cell => cell) ? 'draw' : null;
  };

  // Handle cell click
  const handleCellClick = (index) => {
    if (!gameStarted || board[index] || winner) return;

    const newBoard = [...board];
    newBoard[index] = currentPlayer;
    setBoard(newBoard);

    // Play click sound
    if (clickSound) clickSound.play();

    // Check for winner
    const gameResult = checkWinner(newBoard);
    if (gameResult) {
      if (gameResult !== 'draw') {
        setWinner(gameResult);
        if (winSound) winSound.play();
      } else {
        setWinner('draw');
      }
    } else {
      // Switch players
      setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
    }
  };

  // Restart game
  const restartGame = () => {
    setBoard(Array(9).fill(null));
    setCurrentPlayer('X');
    setWinner(null);
    setGameStarted(true);
  };

  // Start game
  const startGame = () => {
    setGameStarted(true);
  };

  // Render game cell
  const renderCell = (index) => {
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
        onClick={() => handleCellClick(index)}
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

  // Determine player color and icon
  const getPlayerIcon = (player) => {
    return player === 'X' 
      ? <X className="text-red-500 mr-2" size={32} /> 
      : <Circle className="text-green-500 mr-2" size={32} />;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex flex-col items-center justify-center p-4">
      {/* Game Container */}
      <div className="bg-white shadow-2xl rounded-2xl p-6 w-full max-w-md">
        {/* Game Title */}
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
          Tic Tac Toe
        </h1>

        {/* Start Game Button */}
        {!gameStarted && (
          <div className="text-center">
            <button 
              onClick={startGame}
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
        )}

        {/* Game Board */}
        {gameStarted && (
          <>
            <div className="grid grid-cols-3 gap-2 mb-6">
              {[0, 1, 2, 3, 4, 5, 6, 7, 8].map(renderCell)}
            </div>

            {/* Current Player Indicator */}
            <div className="flex items-center justify-center mb-4">
              <span className="text-xl font-semibold flex items-center">
                {getPlayerIcon(currentPlayer)}
                Current Player
              </span>
            </div>
          </>
        )}

        {/* Winner Popup */}
        {winner && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-8 rounded-2xl text-center shadow-2xl">
              <h2 className="text-3xl font-bold mb-4">
                {winner === 'draw' 
                  ? "It's a Draw!" 
                  : `Player ${winner} Wins!`}
              </h2>
              
              <button 
                onClick={restartGame}
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
        )}
      </div>
    </div>
  );
};

export default TicTacToe;