'use client';

import { useState, useEffect, useRef } from 'react';
import { Howl } from 'howler';
import dynamic from 'next/dynamic';

const Confetti = dynamic(() => import('react-confetti'), { ssr: false });

const words = ['oskar', 'mamma', 'pappa'];
const correctSound = new Howl({ src: ['/sounds/correct.mp3'] });
const incorrectSound = new Howl({ src: ['/sounds/incorrect.aiff'] });
const completeSound = new Howl({ src: ['/sounds/applause.wav'] });

export default function TypingGame() {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [typedLetters, setTypedLetters] = useState<string[]>([]);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showStarConfetti, setShowStarConfetti] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const currentWord = words[currentWordIndex];
  const isWordComplete = typedLetters.length === currentWord.length;

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const key = e.key.toLowerCase();
    const currentLetter = currentWord[typedLetters.length].toLowerCase();

    if (key === currentLetter) {
      setTypedLetters([...typedLetters, key]);
      correctSound.play();

      if (typedLetters.length + 1 === currentWord.length) {
        completeSound.play();
        setShowConfetti(true);
        setTimeout(() => {
          setShowConfetti(false);
          if (currentWordIndex + 1 === words.length) {
            setShowStarConfetti(true);
            setTimeout(() => setShowStarConfetti(false), 5000);
          }
          setCurrentWordIndex(currentWordIndex + 1);
          setTypedLetters([]);
        }, 2000);
      }
    } else {
      incorrectSound.play();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      {showConfetti && <Confetti />}
      {showStarConfetti && <Confetti recycle={false} numberOfPieces={500} />}
      
      <div className="text-8xl font-bold mb-8">
        {currentWord.split('').map((letter, index) => (
          <span
            key={index}
            className={`px-2 py-1 rounded ${
              index < typedLetters.length
                ? 'bg-green-500 text-white'
                : 'text-gray-800'
            }`}
          >
            {letter}
          </span>
        ))}
      </div>

      <input
        ref={inputRef}
        type="text"
        className="opacity-0 absolute"
        onKeyDown={handleKeyPress}
        autoFocus
      />
    </div>
  );
} 