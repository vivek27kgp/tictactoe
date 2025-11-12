import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Volume2, VolumeX, Trophy, Target, Sparkles, X } from "lucide-react";

// Ethical Values Collection - 20+ unique messages
const ETHICAL_VALUES = [
  {
    title: "Whistleblower",
    message:
      "Someone who bravely exposes wrongdoing for the greater good. Courage in truth safeguards integrity in any system.",
    icon: "📣",
  },
  {
    title: "Ethics",
    message:
      "The foundation of right conduct. Ethics guide our decisions and shape our collective trust and humanity.",
    icon: "⚖️",
  },
  {
    title: "Integrity",
    message:
      "Being honest and staying true to your moral principles, even when no one is watching. Integrity earns lifelong respect.",
    icon: "🛡️",
  },
  {
    title: "Excellence",
    message:
      "Strive for the highest standards in everything you do. Excellence is a journey of continuous improvement and purpose.",
    icon: "🏆",
  },
  {
    title: "Pioneering",
    message:
      "Being the first to explore new ideas and lead innovation. True pioneers inspire others to dream and act boldly.",
    icon: "🚀",
  },
  {
    title: "Unity",
    message:
      "Standing together as one. Unity builds strength, fosters understanding, and creates unstoppable teams.",
    icon: "🤝",
  },
  {
    title: "Responsibility",
    message:
      "Owning your actions and their outcomes. Responsibility is the foundation of leadership and trust.",
    icon: "⚖️",
  },
  {
    title: "Transparency",
    message:
      "Communicating openly and honestly. Transparency creates clarity, prevents misunderstandings, and builds credibility.",
    icon: "🔍",
  },
  {
    title: "Respect",
    message:
      "Honoring the value and dignity of others. Respect transforms differences into meaningful collaboration.",
    icon: "🙏",
  },
  {
    title: "Trust",
    message:
      "Believing in the reliability and integrity of others. Trust is earned through consistent actions over time.",
    icon: "🤝",
  },
  {
    title: "Accountability",
    message:
      "Taking ownership of your words, actions, and results. Accountability strengthens credibility and teamwork.",
    icon: "📘",
  },
  {
    title: "Fairness",
    message:
      "Treating everyone equally and justly. Fairness ensures harmony, justice, and lasting relationships.",
    icon: "⚖️",
  },
  {
    title: "Honesty",
    message:
      "Always speak the truth with kindness and courage. Honesty builds the foundation of every meaningful connection.",
    icon: "💬",
  },
  {
    title: "Diversity",
    message:
      "Celebrating differences and learning from every perspective. Diversity makes teams stronger and ideas richer.",
    icon: "🌎",
  },
  {
    title: "Equality",
    message:
      "Everyone deserves equal opportunity and respect. Equality empowers people to reach their full potential.",
    icon: "🤲",
  },
  {
    title: "Meritocracy",
    message:
      "Rewarding effort and talent fairly. Meritocracy ensures that success comes from hard work and ability, not privilege.",
    icon: "🎯",
  },
  {
    title: "Innovation",
    message:
      "Turning imagination into reality. Innovation drives progress and transforms challenges into opportunities.",
    icon: "💡",
  },
  {
    title: "Sustainability",
    message:
      "Building a better world without harming tomorrow. Sustainability means mindful growth and conscious action.",
    icon: "🌱",
  },
  {
    title: "Confidentiality",
    message:
      "Protecting private information with discretion. Trust thrives when confidentiality is respected.",
    icon: "🔒",
  },
  {
    title: "Leadership",
    message:
      "Guiding with vision, empathy, and example. True leadership uplifts others and cultivates growth.",
    icon: "🌟",
  },
  {
    title: "Commitment",
    message:
      "Dedication to goals and values even when challenges arise. Commitment is the seed of accomplishment.",
    icon: "💪",
  },
  {
    title: "Courage",
    message:
      "Facing fear with determination. Courage is the bridge between intention and achievement.",
    icon: "🦁",
  },
  {
    title: "Empathy",
    message:
      "Feeling and understanding the emotions of others. Empathy fosters compassion and strong human connections.",
    icon: "❤️",
  },
  {
    title: "Collaboration",
    message:
      "Working together with shared purpose. Collaboration multiplies creativity and success.",
    icon: "🤝",
  },
  {
    title: "Professionalism",
    message:
      "Maintaining competence, respect, and accountability. Professionalism builds confidence and trust in your work.",
    icon: "💼",
  },
  {
    title: "Tolerance",
    message:
      "Embracing differences with patience and respect. Tolerance nurtures peace and cooperation.",
    icon: "🕊️",
  },
  {
    title: "Learning",
    message:
      "A lifelong journey of curiosity and discovery. Each lesson shapes a wiser version of yourself.",
    icon: "📚",
  },
  {
    title: "Empowerment",
    message:
      "Giving people the confidence and authority to act. Empowerment transforms potential into performance.",
    icon: "⚡",
  },
  {
    title: "Communication",
    message:
      "Sharing information clearly and respectfully. Effective communication builds understanding and trust.",
    icon: "🗣️",
  },
  {
    title: "Protection",
    message:
      "Safeguarding people, values, and truth. Protection ensures safety, dignity, and justice for all.",
    icon: "🛡️",
  },
  {
    title: "Objectivity",
    message:
      "Judging situations with facts, not emotions. Objectivity helps maintain fairness and sound decision-making.",
    icon: "🎯",
  },
  {
    title: "Authenticity",
    message:
      "Being genuine and true to yourself. Authenticity inspires confidence and connection.",
    icon: "✨",
  },
  {
    title: "Inclusivity",
    message:
      "Creating space for everyone to belong. Inclusivity celebrates differences and strengthens unity.",
    icon: "🌍",
  },
  {
    title: "Credibility",
    message:
      "Earning trust through consistency and reliability. Credibility turns promises into proven results.",
    icon: "📜",
  },
  {
    title: "Discipline",
    message:
      "Training yourself to stay focused and consistent. Discipline is the key to turning goals into achievements.",
    icon: "🎯",
  },
  {
    title: "Dedication",
    message:
      "Staying fully committed to your purpose. Dedication transforms hard work into lasting success.",
    icon: "🔥",
  },
  {
    title: "Motivation",
    message:
      "The inner drive that pushes you toward greatness. Motivation fuels progress and persistence.",
    icon: "🚀",
  },
  {
    title: "Clarity",
    message:
      "Understanding what truly matters. Clarity helps you make better decisions and stay on your path.",
    icon: "🔦",
  },
  {
    title: "Support",
    message:
      "Helping others grow and succeed. True support strengthens teams and builds lasting bonds.",
    icon: "🫶",
  },
  {
    title: "Recognition",
    message:
      "Acknowledging effort and contribution. Recognition motivates excellence and inspires gratitude.",
    icon: "🏅",
  },
  {
    title: "Resilience",
    message:
      "The strength to recover from challenges stronger than before. Resilience turns obstacles into growth.",
    icon: "🌱",
  },
  {
    title: "Optimism",
    message:
      "Believing in positive outcomes even in adversity. Optimism fuels hope and innovation.",
    icon: "☀️",
  },
  {
    title: "Growth",
    message:
      "Continuously improving and evolving. Growth happens when you step outside your comfort zone.",
    icon: "🌳",
  },
  {
    title: "Vision",
    message:
      "Seeing beyond the present to shape the future. Visionaries turn ideas into reality through belief and action.",
    icon: "🔭",
  },
  {
    title: "Strategy",
    message:
      "Crafting a thoughtful plan to reach your goals. A clear strategy turns dreams into achievable milestones.",
    icon: "🗺️",
  },
  {
    title: "Synergy",
    message:
      "The power of combined effort. Synergy makes collaboration more effective than individual action.",
    icon: "⚙️",
  },
  {
    title: "Inspiration",
    message:
      "The spark that ignites creativity and courage. Inspiration pushes boundaries and elevates others.",
    icon: "💫",
  },
  {
    title: "Honour",
    message:
      "Living with dignity, respect, and truth. Honour defines how others remember your character.",
    icon: "🎖️",
  },

  // --- Additional curated values ---
  {
    title: "Kindness",
    message:
      "A small act of kindness can make a big difference. Compassion is contagious — spread it widely.",
    icon: "💖",
  },
  {
    title: "Mindfulness",
    message:
      "Be fully present in the moment. Mindfulness brings calmness, clarity, and better choices.",
    icon: "🧘",
  },
  {
    title: "Curiosity",
    message:
      "Keep asking questions and exploring. Curiosity is the beginning of all wisdom and discovery.",
    icon: "🔍",
  },
  {
    title: "Accountable",
    message:
      "Owning your results and learning from them. Accountability builds respect and growth.",
    icon: "📗",
  },
  {
    title: "Safety",
    message:
      "Protect yourself and others by acting responsibly. Safety ensures wellbeing and trust for all.",
    icon: "🦺",
  },
  {
    title: "Culture",
    message:
      "A reflection of shared beliefs and practices. A strong culture fosters belonging and pride.",
    icon: "🎭",
  },
  {
    title: "Governance",
    message:
      "Leading with fairness, clarity, and accountability. Good governance ensures lasting progress.",
    icon: "🏛️",
  },
  {
    title: "Prevention",
    message:
      "Act early to avoid harm or failure. Prevention is the best form of protection.",
    icon: "🛑",
  },
  {
    title: "Empowerment",
    message:
      "When people are trusted and encouraged, they grow beyond limits. Empowerment fuels innovation and joy.",
    icon: "⚡",
  },
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
  const [consecutiveWins, setConsecutiveWins] = useState(0);
  const [consecutiveLosses, setConsecutiveLosses] = useState(0);

  // Ethical values state
  const [unlockedValue, setUnlockedValue] = useState(null);
  const [showValueNotification, setShowValueNotification] = useState(false);
  const [showValueModal, setShowValueModal] = useState(false);
  const lastValueIndexRef = useRef(Math.floor(Math.random() * ETHICAL_VALUES.length));

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
      }, 600);

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
  ]);

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
