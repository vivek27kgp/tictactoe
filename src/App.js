import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Volume2, VolumeX, Trophy, Target, Sparkles, X } from "lucide-react";

// Ethical Values Collection - 20+ unique messages
const ETHICAL_VALUES = [
  {
    title: "Integrity",
    message:
      "Always be honest and true to your word. Your character is defined by what you do when no one is watching.",
    icon: "🛡️",
  },
  {
    title: "Empathy",
    message:
      "Try to understand others' feelings and perspectives. Kindness and compassion make the world a better place.",
    icon: "❤️",
  },
  {
    title: "Perseverance",
    message:
      "Success comes to those who keep trying. Every failure is a lesson that brings you closer to your goal.",
    icon: "💪",
  },
  {
    title: "Respect",
    message:
      "Treat everyone with dignity, regardless of their background or beliefs. Respect is the foundation of harmony.",
    icon: "🤝",
  },
  {
    title: "Gratitude",
    message:
      "Appreciate what you have and express thanks to those who help you. A grateful heart is a magnet for miracles.",
    icon: "🙏",
  },
  {
    title: "Courage",
    message:
      "Bravery isn't the absence of fear, but acting despite it. Stand up for what's right, even when it's difficult.",
    icon: "🦁",
  },
  {
    title: "Humility",
    message:
      "Stay humble in victory and gracious in defeat. There's always more to learn from everyone around you.",
    icon: "🌟",
  },
  {
    title: "Responsibility",
    message:
      "Take ownership of your actions and their consequences. Being accountable builds trust and respect.",
    icon: "⚖️",
  },
  {
    title: "Creativity",
    message:
      "Think outside the box and embrace innovative solutions. Your unique perspective can change the world.",
    icon: "🎨",
  },
  {
    title: "Patience",
    message:
      "Good things take time. Learn to wait calmly and trust the process of growth and development.",
    icon: "⏳",
  },
  {
    title: "Fairness",
    message:
      "Treat others as you would like to be treated. Justice and equality should guide all your actions.",
    icon: "⚖️",
  },
  {
    title: "Self-Discipline",
    message:
      "Master yourself before trying to master anything else. Consistent effort leads to extraordinary results.",
    icon: "🎯",
  },
  {
    title: "Generosity",
    message:
      "Share your time, knowledge, and resources with others. What you give comes back multiplied.",
    icon: "🎁",
  },
  {
    title: "Optimism",
    message:
      "Choose to see the positive in every situation. A positive mindset creates positive outcomes.",
    icon: "☀️",
  },
  {
    title: "Authenticity",
    message:
      "Be yourself unapologetically. Your uniqueness is your superpower in this world.",
    icon: "✨",
  },
  {
    title: "Mindfulness",
    message:
      "Live in the present moment. Being aware and focused brings peace and clarity to your life.",
    icon: "🧘",
  },
  {
    title: "Collaboration",
    message:
      "Together we achieve more than alone. Value teamwork and collective success over individual glory.",
    icon: "🤝",
  },
  {
    title: "Wisdom",
    message:
      "Knowledge is knowing what to say; wisdom is knowing when to say it. Learn from experience and others.",
    icon: "🦉",
  },
  {
    title: "Adaptability",
    message:
      "Be flexible and open to change. Those who adapt to new situations thrive in any environment.",
    icon: "🌊",
  },
  {
    title: "Excellence",
    message:
      "Strive for quality in everything you do. Excellence is not a destination but a continuous journey.",
    icon: "🏆",
  },
  {
    title: "Compassion",
    message:
      "Show kindness to all living beings. Small acts of care can heal wounds and change lives.",
    icon: "💝",
  },
  {
    title: "Balance",
    message:
      "Find harmony between work and play, giving and receiving. A balanced life is a fulfilling life.",
    icon: "⚖️",
  },
  {
    title: "Curiosity",
    message:
      "Never stop asking questions and seeking knowledge. A curious mind is always growing and evolving.",
    icon: "🔍",
  },
  {
    title: "Resilience",
    message:
      "Bounce back from setbacks stronger than before. Your ability to recover defines your success.",
    icon: "🌱",
  },
];

// Sound effects using Web Audio API
const createSound = (frequency, duration, type = "sine") => {
  try {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
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

// Square Component - Individual cell in the board
const Square = ({ value, onClick, isWinning, disabled }) => {
  return (
    <motion.button
      whileHover={!disabled && !value ? { scale: 1.05, rotate: 2 } : {}}
      whileTap={!disabled && !value ? { scale: 0.95 } : {}}
      onClick={onClick}
      disabled={disabled || value}
      className={`
        aspect-square rounded-xl md:rounded-2xl font-bold text-4xl md:text-5xl
        transition-all duration-300 relative overflow-hidden
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
          <div className="text-emerald-300 text-xs font-medium">
            Wins
          </div>
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
          <div className="text-red-300 text-xs font-medium">
            Losses
          </div>
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
const GameBoard = ({ board, onSquareClick, winningLine, disabled }) => {
  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 0.2 }}
      className="grid grid-cols-3 gap-2 w-full max-w-xs md:max-w-sm mb-3 md:mb-4"
    >
      {board.map((value, index) => (
        <Square
          key={index}
          value={value}
          onClick={() => onSquareClick(index)}
          isWinning={winningLine?.includes(index)}
          disabled={disabled}
        />
      ))}
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

// Ethical Value Unlock Notification
const ValueUnlockNotification = ({ value, onClose, onViewDetails }) => {
  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 100, opacity: 0 }}
      className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-96 z-50"
    >
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-4 shadow-2xl border-2 border-white/20 backdrop-blur-md">
        <div className="flex items-start justify-between mb-2">
          <div className="flex items-center gap-2">
            <Sparkles className="text-yellow-300 animate-pulse" size={24} />
            <h3 className="text-white font-bold text-lg">Value Unlocked!</h3>
          </div>
          <button
            onClick={onClose}
            className="text-white/70 hover:text-white transition-colors"
          >
            <X size={20} />
          </button>
        </div>
        <div className="flex items-center gap-3 mb-3">
          <span className="text-4xl">{value.icon}</span>
          <div>
            <p className="text-white font-semibold text-xl">{value.title}</p>
            <p className="text-white/80 text-sm">Tap to read the message</p>
          </div>
        </div>
        <button
          onClick={onViewDetails}
          className="w-full bg-white/20 hover:bg-white/30 text-white font-semibold py-2 rounded-lg transition-colors backdrop-blur-sm"
        >
          View Message
        </button>
      </div>
    </motion.div>
  );
};

// Ethical Value Detail Modal
const ValueDetailModal = ({ value, onClose }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0, y: 50 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.8, opacity: 0, y: 50 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-gradient-to-br from-purple-600 via-pink-600 to-purple-700 rounded-3xl p-6 md:p-8 max-w-md w-full shadow-2xl border-2 border-white/20"
      >
        <div className="text-center mb-4">
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 0.5, repeat: 3 }}
            className="text-7xl md:text-8xl mb-4"
          >
            {value.icon}
          </motion.div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
            {value.title}
          </h2>
          <div className="w-20 h-1 bg-white/50 mx-auto rounded-full mb-4"></div>
        </div>

        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 mb-6 border border-white/20">
          <p className="text-white text-base md:text-lg leading-relaxed text-center">
            {value.message}
          </p>
        </div>

        <button
          onClick={() => {
            onClose();
            // Reset the auto-restart timer after closing modal
            setTimeout(() => {
              // This will trigger the useEffect to start the 3-second timer
            }, 100);
          }}
          className="w-full bg-white text-purple-600 hover:bg-white/90 font-bold py-3 md:py-4 rounded-xl transition-colors text-base md:text-lg"
        >
          Continue Playing
        </button>
      </motion.div>
    </motion.div>
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

  // Ethical values state
  const [unlockedValue, setUnlockedValue] = useState(null);
  const [showValueNotification, setShowValueNotification] = useState(false);
  const [showValueModal, setShowValueModal] = useState(false);
  const lastValueIndexRef = useRef(-1);

  // Get random value (ensuring no consecutive repeats)
  const getRandomValue = () => {
    let randomIndex;
    do {
      randomIndex = Math.floor(Math.random() * ETHICAL_VALUES.length);
    } while (
      randomIndex === lastValueIndexRef.current &&
      ETHICAL_VALUES.length > 1
    );

    lastValueIndexRef.current = randomIndex;
    return ETHICAL_VALUES[randomIndex];
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

  // AI Logic - Easy mode with 60% smart, 40% random
  const getAIMove = useCallback((currentBoard) => {
    const emptyCells = currentBoard
      .map((val, idx) => (val === null ? idx : null))
      .filter((val) => val !== null);

    if (emptyCells.length === 0) return null;

    // 40% chance of random move (making AI easier to beat)
    if (Math.random() < 0.4) {
      return emptyCells[Math.floor(Math.random() * emptyCells.length)];
    }

    // 60% chance of smart move
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
  }, [checkWinner]);

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
      setShowConfetti(true);
      playWinSound(isMuted ? 0 : volume);

      // Unlock a random ethical value
      const randomValue = getRandomValue();
      setUnlockedValue(randomValue);

      setTimeout(() => {
        setShowValueNotification(true);
      }, 1500);

      setTimeout(() => setShowConfetti(false), 3000);
      return;
    }

    if (newBoard.every((cell) => cell !== null)) {
      setGameOver(true);
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

          const result = checkWinner(newBoard);
          if (result) {
            setWinningLine(result.line);
            setGameOver(true);
            setLosses(losses + 1);
            playLoseSound(isMuted ? 0 : volume);
            return;
          }

          if (newBoard.every((cell) => cell !== null)) {
            setGameOver(true);
            return;
          }

          setIsPlayerTurn(true);
        }
      }, 600);

      return () => clearTimeout(timer);
    }
  }, [isPlayerTurn, gameOver, board, volume, isMuted, losses, getAIMove, checkWinner]);



  // Reset game
  const resetGame = useCallback(() => {
    setBoard(Array(9).fill(null));
    setIsPlayerTurn(playerStartsNext);
    setGameOver(false);
    setWinningLine(null);
    setPlayerStartsNext(!playerStartsNext); // Alternate who starts next game
  }, [playerStartsNext]);

  // Auto-restart game after win/loss/draw (pause when modal is open)
  useEffect(() => {
    if (gameOver && !showValueNotification && !showValueModal) {
      const timer = setTimeout(() => {
        resetGame();
      }, 3000); // Wait 3 seconds before auto-restart

      return () => clearTimeout(timer);
    }
  }, [gameOver, resetGame, showValueNotification, showValueModal]);

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
          setIsPlayerTurn(true);
        }
      }, 600);

      return () => clearTimeout(timer);
    }
  }, [isPlayerTurn, board, gameOver, volume, isMuted, getAIMove]);

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

      {/* TATA ETHICS GAMES Header */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="relative z-10 text-center pt-4 pb-2"
      >
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white" style={{ fontFamily: "'Poppins', sans-serif" }}>
          TATA ETHICS GAMES
        </h1>
      </motion.div>

      <div className="relative z-10 flex flex-col items-center justify-center flex-1 px-4 pb-4">
        {/* Game Title */}
        <motion.h2
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 md:mb-6 text-center"
          style={{ fontFamily: "'Poppins', sans-serif" }}
        >
          Tic Tac Toe
        </motion.h2>

        {/* Scoreboard */}
        <Scoreboard wins={wins} losses={losses} />

        {/* Game Board */}
        <GameBoard
          board={board}
          onSquareClick={handleSquareClick}
          winningLine={winningLine}
          disabled={!isPlayerTurn || gameOver}
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
        <div className="flex flex-wrap gap-2 md:gap-3 items-center justify-center">
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

      {/* Ethical Value Notification */}
      <AnimatePresence>
        {showValueNotification && unlockedValue && !showValueModal && (
          <ValueUnlockNotification
            value={unlockedValue}
            onClose={() => setShowValueNotification(false)}
            onViewDetails={() => {
              setShowValueNotification(false);
              setShowValueModal(true);
            }}
          />
        )}
      </AnimatePresence>

      {/* Ethical Value Detail Modal */}
      <AnimatePresence>
        {showValueModal && unlockedValue && (
          <ValueDetailModal
            value={unlockedValue}
            onClose={() => setShowValueModal(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}