'use client';

import { useState, useEffect, useRef } from 'react';
import { Howl } from 'howler';
import dynamic from 'next/dynamic';
import { useSearchParams } from 'next/navigation';

const Confetti = dynamic(() => import('react-confetti'), { ssr: false });

const defaultWords = ['oskar', 'mamma', 'pappa'];
const correctSound = new Howl({ src: [`${process.env.NEXT_PUBLIC_BASE_PATH}/sounds/correct.mp3`] });
const incorrectSound = new Howl({ src: [`${process.env.NEXT_PUBLIC_BASE_PATH}/sounds/incorrect.aiff`] });
const completeSound = new Howl({ src: [`${process.env.NEXT_PUBLIC_BASE_PATH}/sounds/applause.wav`] });

export default function TypingGame() {
  const searchParams = useSearchParams();
  const urlWords = searchParams.get('words')?.split(',').map(w => w.trim().toLowerCase()) || [];
  const words = urlWords.length > 0 ? urlWords : defaultWords;
  
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [typedLetters, setTypedLetters] = useState<string[]>([]);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showStarConfetti, setShowStarConfetti] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const currentWord = words[currentWordIndex];

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const key = e.key.toLowerCase();
    if (!currentWord || typedLetters.length >= currentWord.length) return;
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
            setCurrentWordIndex(0);
          } else {
            setCurrentWordIndex(currentWordIndex + 1);
          }
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
            {letter.toUpperCase()}
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