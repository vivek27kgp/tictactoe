import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Volume2, VolumeX, Trophy, Target } from "lucide-react";

// Tata Values - 9 core values
const TATA_VALUES = [
  "INTEGRITY",
  "PIONEERING", 
  "EXCELLENCE",
  "UNITY",
  "RESPONSIBILITY",
  "CUSTOMER FOCUS",
  "RESPECT & INCLUSION",
  "DIVERSITY",
  "TRANSPARENCY"
];

// Sound effects using Web Audio API
const createSound = (frequency, duration, type = "sine") => {
  try {
    const audioContext = new (window.AudioContext ||
      window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.frequency.value = frequency;
    oscillator.type = type;

    gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(
      0.01,
      audioContext.currentTime + duration
    );

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + duration);
  } catch (error) {
    console.log("Audio not supported");
  }
};

const playMoveSound = (volume) => {
  if (volume > 0) {
    createSound(400, 0.1, "sine");
  }
};

const playWinSound = (volume) => {
  if (volume > 0) {
    setTimeout(() => createSound(523, 0.15, "sine"), 0);
    setTimeout(() => createSound(659, 0.15, "sine"), 150);
    setTimeout(() => createSound(784, 0.3, "sine"), 300);
  }
};

const playLoseSound = (volume) => {
  if (volume > 0) {
    setTimeout(() => createSound(400, 0.15, "sine"), 0);
    setTimeout(() => createSound(300, 0.3, "sine"), 150);
  }
};

// Flying Value Animation Component
const FlyingValue = ({ value, onComplete }) => {
  return (
    <motion.div
      initial={{ 
        y: 0, 
        opacity: 1, 
        scale: 0.5 
      }}
      animate={{ 
        y: -150, 
        opacity: 0, 
        scale: 1.2 
      }}
      transition={{ 
        duration: 2.5, 
        ease: "easeOut" 
      }}
      onAnimationComplete={onComplete}
      className="absolute pointer-events-none z-50 font-bold text-sm text-white bg-gradient-to-r from-cyan-400 to-emerald-400 px-3 py-1 rounded-full shadow-lg border border-white/40 whitespace-nowrap"
      style={{
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)'
      }}
    >
      {value}
    </motion.div>
  );
};

// Square Component - Individual cell in the board
const Square = ({ value, onClick, isWinning, disabled, index, onValueFly, flyingValue }) => {
  const handleClick = () => {
    if (!disabled && !value) {
      onValueFly(index);
    }
    onClick();
  };

  return (
    <motion.button
      whileHover={!disabled && !value ? { scale: 1.05, rotate: 2 } : {}}
      whileTap={!disabled && !value ? { scale: 0.95 } : {}}
      onClick={handleClick}
      disabled={disabled || value}
      className={`
        aspect-square rounded-xl md:rounded-2xl font-bold text-4xl md:text-5xl
        transition-all duration-300 relative overflow-visible
        ${value ? "cursor-default" : "cursor-pointer"}
        ${
          isWinning
            ? "bg-gradient-to-br from-yellow-300 to-yellow-500"
            : "bg-white/10 hover:bg-white/20"
        }
        ${!value && !disabled ? "backdrop-blur-sm" : ""}
        border-2 border-white/20
      `}
    >
      <AnimatePresence>
        {value && (
          <motion.span
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0, rotate: 180 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className={`
              absolute inset-0 flex items-center justify-center
              ${value === "X" ? "text-cyan-300" : "text-emerald-300"}
              ${isWinning ? "text-white" : ""}
            `}
          >
            {value}
          </motion.span>
        )}
      </AnimatePresence>
      
      {/* Flying Value for this square */}
      <AnimatePresence>
        {flyingValue && (
          <FlyingValue
            value={flyingValue.value}
            onComplete={flyingValue.onComplete}
          />
        )}
      </AnimatePresence>
    </motion.button>
  );
};

// Scoreboard Component
const Scoreboard = ({ wins, losses }) => {
  return (
    <motion.div
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="flex gap-2 md:gap-4 mb-4 md:mb-6"
    >
      <motion.div
        whileHover={{ scale: 1.05 }}
        className="flex items-center gap-2 md:gap-3 bg-white/10 backdrop-blur-md px-3 md:px-4 py-2 rounded-xl border-2 border-emerald-400/30"
      >
        <Trophy className="text-emerald-300" size={18} />
        <div>
          <div className="text-emerald-300 text-xs font-medium">Wins</div>
          <motion.div
            key={wins}
            initial={{ scale: 1.5, color: "#6ee7b7" }}
            animate={{ scale: 1, color: "#ffffff" }}
            className="text-xl md:text-2xl font-bold"
          >
            {wins}
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        whileHover={{ scale: 1.05 }}
        className="flex items-center gap-2 md:gap-3 bg-white/10 backdrop-blur-md px-3 md:px-4 py-2 rounded-xl border-2 border-red-400/30"
      >
        <Target className="text-red-300" size={18} />
        <div>
          <div className="text-red-300 text-xs font-medium">Losses</div>
          <motion.div
            key={losses}
            initial={{ scale: 1.5, color: "#fca5a5" }}
            animate={{ scale: 1, color: "#ffffff" }}
            className="text-xl md:text-2xl font-bold"
          >
            {losses}
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};

// GameBoard Component
const GameBoard = ({ board, onSquareClick, winningLine, disabled, onValueFly, flyingValues, removeFlyingValue }) => {
  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 0.2 }}
      className="grid grid-cols-3 gap-2 w-full max-w-xs md:max-w-sm mb-3 md:mb-4"
    >
      {board.map((value, index) => {
        const flyingValue = flyingValues.find(fv => fv.squareIndex === index);
        return (
          <Square
            key={index}
            value={value}
            onClick={() => onSquareClick(index)}
            isWinning={winningLine?.includes(index)}
            disabled={disabled}
            index={index}
            onValueFly={onValueFly}
            flyingValue={flyingValue ? {
              value: flyingValue.value,
              onComplete: () => removeFlyingValue(flyingValue.id)
            } : null}
          />
        );
      })}
    </motion.div>
  );
};

// Confetti Component for winning
const Confetti = () => {
  const confetti = Array.from({ length: 30 });

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-40">
      {confetti.map((_, i) => (
        <motion.div
          key={i}
          initial={{
            x:
              typeof window !== "undefined"
                ? Math.random() * window.innerWidth
                : 0,
            y: -20,
            rotate: 0,
            opacity: 1,
          }}
          animate={{
            y: typeof window !== "undefined" ? window.innerHeight + 20 : 1000,
            rotate: Math.random() * 720 - 360,
            opacity: 0,
          }}
          transition={{
            duration: Math.random() * 2 + 2,
            ease: "linear",
            delay: Math.random() * 0.5,
          }}
          className="absolute w-3 h-3 rounded-full"
          style={{
            backgroundColor: [
              "#6ee7b7",
              "#34d399",
              "#10b981",
              "#a78bfa",
              "#8b5cf6",
            ][Math.floor(Math.random() * 5)],
          }}
        />
      ))}
    </div>
  );
};



// Main App Component
export default function App() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isPlayerTurn, setIsPlayerTurn] = useState(true);
  const [gameOver, setGameOver] = useState(false);
  const [winningLine, setWinningLine] = useState(null);
  const [wins, setWins] = useState(0);
  const [losses, setLosses] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [isMuted, setIsMuted] = useState(false);
  const [playerStartsNext, setPlayerStartsNext] = useState(true);
  const [consecutiveWins, setConsecutiveWins] = useState(0);
  const [consecutiveLosses, setConsecutiveLosses] = useState(0);

  // Flying values state
  const [flyingValues, setFlyingValues] = useState([]);
  const [shuffledValues, setShuffledValues] = useState([]);
  const [valueIndex, setValueIndex] = useState(0);

  // Initialize shuffled values on game start
  useEffect(() => {
    const shuffled = [...TATA_VALUES].sort(() => Math.random() - 0.5);
    setShuffledValues(shuffled);
    setValueIndex(0);
  }, []);

  // Get next value from shuffled array
  const getNextValue = useCallback(() => {
    if (valueIndex >= shuffledValues.length) {
      // Reshuffle when all values are used
      const newShuffled = [...TATA_VALUES].sort(() => Math.random() - 0.5);
      setShuffledValues(newShuffled);
      setValueIndex(1);
      return newShuffled[0];
    }
    const value = shuffledValues[valueIndex];
    setValueIndex(prev => prev + 1);
    return value;
  }, [valueIndex, shuffledValues]);

  // Handle flying value animation
  const handleValueFly = useCallback((squareIndex) => {
    const value = getNextValue();
    const id = Date.now() + Math.random();
    setFlyingValues(prev => [...prev, { id, value, squareIndex }]);
  }, [getNextValue]);

  // Remove completed flying value
  const removeFlyingValue = (id) => {
    setFlyingValues(prev => prev.filter(fv => fv.id !== id));
  };

  // Check for winner
  const checkWinner = useCallback((currentBoard) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8], // Rows
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8], // Columns
      [0, 4, 8],
      [2, 4, 6], // Diagonals
    ];

    for (let line of lines) {
      const [a, b, c] = line;
      if (
        currentBoard[a] &&
        currentBoard[a] === currentBoard[b] &&
        currentBoard[a] === currentBoard[c]
      ) {
        return { winner: currentBoard[a], line };
      }
    }
    return null;
  }, []);

  // AI Logic - Dynamic difficulty based on consecutive wins/losses
  const getAIMove = useCallback(
    (currentBoard) => {
      const emptyCells = currentBoard
        .map((val, idx) => (val === null ? idx : null))
        .filter((val) => val !== null);

      if (emptyCells.length === 0) return null;

      // Dynamic difficulty adjustment
      let randomChance = 0.3; // Default 30% random
      if (consecutiveWins >= 3) {
        randomChance = 0.1; // 10% random (90% smart) when player wins 3+ in a row
      } else if (consecutiveLosses >= 3) {
        randomChance = 0.6; // 60% random (40% smart) when player loses 3+ in a row
      }

      if (Math.random() < randomChance) {
        return emptyCells[Math.floor(Math.random() * emptyCells.length)];
      }

      // Smart move logic
      // Try to win
      for (let cell of emptyCells) {
        const testBoard = [...currentBoard];
        testBoard[cell] = "O";
        if (checkWinner(testBoard)?.winner === "O") {
          return cell;
        }
      }

      // Try to block player
      for (let cell of emptyCells) {
        const testBoard = [...currentBoard];
        testBoard[cell] = "X";
        if (checkWinner(testBoard)?.winner === "X") {
          return cell;
        }
      }

      // Take center if available
      if (currentBoard[4] === null) return 4;

      // Take a random corner
      const corners = [0, 2, 6, 8].filter((i) => currentBoard[i] === null);
      if (corners.length > 0) {
        return corners[Math.floor(Math.random() * corners.length)];
      }

      // Take any available cell
      return emptyCells[Math.floor(Math.random() * emptyCells.length)];
    },
    [checkWinner, consecutiveWins, consecutiveLosses]
  );

  // Handle player move
  const handleSquareClick = (index) => {
    if (board[index] || gameOver || !isPlayerTurn) return;

    const newBoard = [...board];
    newBoard[index] = "X";
    setBoard(newBoard);
    playMoveSound(isMuted ? 0 : volume);

    const result = checkWinner(newBoard);
    if (result) {
      setWinningLine(result.line);
      setGameOver(true);
      setWins(wins + 1);
      setConsecutiveWins(consecutiveWins + 1);
      setConsecutiveLosses(0);
      setShowConfetti(true);
      playWinSound(isMuted ? 0 : volume);
      setTimeout(() => setShowConfetti(false), 3000);
      return;
    }

    if (newBoard.every((cell) => cell !== null)) {
      setGameOver(true);
      // Draw doesn't reset consecutive counters
      return;
    }

    setIsPlayerTurn(false);
  };

  // AI turn effect
  useEffect(() => {
    if (!isPlayerTurn && !gameOver) {
      const timer = setTimeout(() => {
        const aiMove = getAIMove(board);
        if (aiMove !== null) {
          const newBoard = [...board];
          newBoard[aiMove] = "O";
          setBoard(newBoard);
          playMoveSound(isMuted ? 0 : volume);

          // Trigger flying value for AI move
          setTimeout(() => {
            handleValueFly(aiMove);
          }, 500);

          const result = checkWinner(newBoard);
          if (result) {
            setWinningLine(result.line);
            setGameOver(true);
            setLosses(losses + 1);
            setConsecutiveLosses(consecutiveLosses + 1);
            setConsecutiveWins(0);
            playLoseSound(isMuted ? 0 : volume);
            return;
          }

          if (newBoard.every((cell) => cell !== null)) {
            setGameOver(true);
            // Draw doesn't reset consecutive counters
            return;
          }

          setIsPlayerTurn(true);
        }
      }, 1100);

      return () => clearTimeout(timer);
    }
  }, [
    isPlayerTurn,
    gameOver,
    board,
    volume,
    isMuted,
    losses,
    getAIMove,
    checkWinner,
    consecutiveLosses,
    consecutiveWins,
    handleValueFly,
  ]);

  // Reset game
  const resetGame = useCallback(() => {
    setBoard(Array(9).fill(null));
    setIsPlayerTurn(playerStartsNext);
    setGameOver(false);
    setWinningLine(null);
    setPlayerStartsNext(!playerStartsNext); // Alternate who starts next game
    // Reset values for new game
    const shuffled = [...TATA_VALUES].sort(() => Math.random() - 0.5);
    setShuffledValues(shuffled);
    setValueIndex(0);
  }, [playerStartsNext]);

  // Auto-restart game after win/loss/draw
  useEffect(() => {
    if (gameOver) {
      const timer = setTimeout(() => {
        resetGame();
      }, 3000); // Wait 3 seconds before auto-restart

      return () => clearTimeout(timer);
    }
  }, [gameOver, resetGame]);

  // AI makes first move if it starts
  useEffect(() => {
    if (!isPlayerTurn && !gameOver && board.every((cell) => cell === null)) {
      const timer = setTimeout(() => {
        const aiMove = getAIMove(board);
        if (aiMove !== null) {
          const newBoard = [...board];
          newBoard[aiMove] = "O";
          setBoard(newBoard);
          playMoveSound(isMuted ? 0 : volume);
          
          // Trigger flying value for AI's first move
          setTimeout(() => {
            handleValueFly(aiMove);
          }, 500);
          
          setIsPlayerTurn(true);
        }
      }, 1100);

      return () => clearTimeout(timer);
    }
  }, [isPlayerTurn, board, gameOver, volume, isMuted, getAIMove, handleValueFly]);

  return (
    <div className="h-screen w-full bg-gradient-to-br from-cyan-900 via-teal-800 to-emerald-900 flex flex-col relative overflow-hidden">
      {/* Animated background */}
      <motion.div
        animate={{
          background: [
            "radial-gradient(circle at 20% 50%, rgba(6, 182, 212, 0.3) 0%, transparent 50%)",
            "radial-gradient(circle at 80% 50%, rgba(16, 185, 129, 0.3) 0%, transparent 50%)",
            "radial-gradient(circle at 50% 80%, rgba(6, 182, 212, 0.3) 0%, transparent 50%)",
            "radial-gradient(circle at 20% 50%, rgba(6, 182, 212, 0.3) 0%, transparent 50%)",
          ],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0"
      />

      {showConfetti && <Confetti />}

      <div className="relative z-10 flex flex-col items-center justify-center flex-1 px-4 pb-4">
        {/* Game Title */}
        <motion.h2
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2 text-center"
          style={{ fontFamily: "'Poppins', sans-serif" }}
        >
          Tic Tac Toe
        </motion.h2>
        
        {/* Tagline */}
        <motion.p
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-cyan-200 text-sm md:text-base mb-4 md:mb-6 text-center"
        >
          Tap a Square to Unlock More Values
        </motion.p>

        {/* Scoreboard */}
        <Scoreboard wins={wins} losses={losses} />

        {/* Game Board */}
        <GameBoard
          board={board}
          onSquareClick={handleSquareClick}
          winningLine={winningLine}
          disabled={!isPlayerTurn || gameOver}
          onValueFly={handleValueFly}
          flyingValues={flyingValues}
          removeFlyingValue={removeFlyingValue}
        />

        {/* Game Status */}
        <AnimatePresence mode="wait">
          {gameOver && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              className="text-center mb-3 md:mb-4"
            >
              <div className="text-xl md:text-2xl font-bold text-white mb-2">
                {winningLine
                  ? board[winningLine[0]] === "X"
                    ? "🎉 You Win!"
                    : "🤖 AI Wins!"
                  : "🤝 Draw!"}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {!gameOver && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-cyan-200 text-base md:text-lg mb-3 md:mb-4"
          >
            {isPlayerTurn ? "Your turn (X)" : "AI is thinking..."}
          </motion.div>
        )}

        {/* Controls */}
        <div className="fixed top-4 right-4 flex gap-2 items-center">
          {/* Volume Control */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsMuted(!isMuted)}
            className="bg-white/10 backdrop-blur-md text-white p-2 md:p-2.5 rounded-full border-2 border-white/20 hover:bg-white/20 transition-colors"
          >
            {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
          </motion.button>

          {/* Volume Slider */}
          {!isMuted && (
            <motion.input
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 60, opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={volume}
              onChange={(e) => setVolume(parseFloat(e.target.value))}
              className="accent-cyan-400 w-16 md:w-20"
            />
          )}
        </div>
      </div>


    </div>
  );
}
