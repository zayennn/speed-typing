import React, { useState, useEffect, useRef, useCallback } from 'react';
import './App.css';

const App = () => {
  const [words, setWords] = useState([]);
  const [input, setInput] = useState('');
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [stats, setStats] = useState({ wpm: 0, accuracy: 0 });
  const [currentIndex, setCurrentIndex] = useState(0);
  const [typedChars, setTypedChars] = useState([]);
  const inputRef = useRef(null);

  // Kumpulan kata dalam bahasa Indonesia (semua lowercase)
  const wordList = [
    'dan', 'di', 'ke', 'dari', 'yang', 'ini', 'itu', 'dengan', 'untuk', 'tidak',
    'akan', 'ada', 'bisa', 'saya', 'kamu', 'kita', 'mereka', 'dia', 'aku', 'engkau',
    'pada', 'sudah', 'jadi', 'atau', 'juga', 'tapi', 'kalau', 'karena', 'jika', 'supaya',
    'meski', 'walau', 'sebab', 'maka', 'lalu', 'kemudian', 'sedang', 'sambil', 'seraya',
    'sementara', 'setelah', 'sebelum', 'ketika', 'sampai', 'hingga', 'agar', 'biar',
    'walaupun', 'meskipun', 'sekalipun', 'kendati', 'meski', 'sungguh', 'benar', 'betul',
    'sangat', 'amat', 'terlalu', 'sekali', 'agak', 'cukup', 'kurang', 'lebih', 'paling',
    'ter', 'sekitar', 'hampir', 'nyaris', 'hanya', 'cuma', 'semata', 'saja', 'pun', 'lah',
    'kah', 'tah', 'pun', 'per', 'ber', 'ter', 'me', 'di', 'ke', 'se', 'nya', 'an', 'i', 'kan'
  ];

  // Generate kata acak
  const generateWords = useCallback(() => {
    const newWords = [];
    for (let i = 0; i < 50; i++) {
      const randomWord = wordList[Math.floor(Math.random() * wordList.length)];
      newWords.push(randomWord);
    }
    setWords(newWords);
    setInput('');
    setCurrentIndex(0);
    setTypedChars([]);
    setTime(0);
    setIsRunning(false);
    setStats({ wpm: 0, accuracy: 0 });
  }, []);

  // Inisialisasi
  useEffect(() => {
    generateWords();
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [generateWords]);

  // Timer
  useEffect(() => {
    let interval = null;
    if (isRunning) {
      interval = setInterval(() => {
        setTime(prevTime => prevTime + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  // Hitung stats
  useEffect(() => {
    if (typedChars.length > 0 && time > 0) {
      const correctChars = typedChars.filter(char => char.status === 'correct').length;
      const totalChars = typedChars.length;
      const accuracy = totalChars > 0 ? Math.round((correctChars / totalChars) * 100) : 0;
      
      // WPM calculation: (correct characters / 5) / (time / 60)
      const wpm = time > 0 ? Math.round((correctChars / 5) / (time / 60)) : 0;
      
      setStats({ wpm, accuracy });
    }
  }, [typedChars, time]);

  const handleInputChange = (e) => {
    const value = e.target.value.toLowerCase();
    
    if (!isRunning && value.length > 0) {
      setIsRunning(true);
    }

    if (value.endsWith(' ')) {
      const typedWord = value.trim();
      
      if (typedWord === words[currentIndex]) {
        // Kata benar
        const newTypedChars = [...typedWord].map(char => ({ char, status: 'correct' }));
        setTypedChars(prev => [...prev, ...newTypedChars, { char: ' ', status: 'correct' }]);
      } else {
        // Kata salah
        const newTypedChars = [...typedWord].map(char => ({ char, status: 'incorrect' }));
        setTypedChars(prev => [...prev, ...newTypedChars, { char: ' ', status: 'incorrect' }]);
      }
      
      setInput('');
      setCurrentIndex(prev => prev + 1);
      
      // Jika sudah mencapai akhir, generate kata baru
      if (currentIndex + 1 >= words.length) {
        generateWords();
      }
    } else {
      setInput(value);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      generateWords();
    }
  };

  const getWordClass = (wordIndex, charIndex, char) => {
    const typedCharIndex = typedChars.findIndex((tc, index) => {
      const wordStart = typedChars.slice(0, index).filter(tc => tc.char === ' ').length;
      return wordStart === wordIndex && 
             typedChars.slice(0, index).filter(tc => tc.char !== ' ').length - 
             typedChars.slice(0, index).filter((tc, i) => tc.char === ' ' && i < index).length * words[wordStart].length === charIndex;
    });

    if (typedCharIndex !== -1) {
      return typedChars[typedCharIndex].status;
    }
    
    if (wordIndex === currentIndex && charIndex < input.length) {
      return input[charIndex] === char ? 'correct' : 'incorrect';
    }
    
    return '';
  };

  const restartTest = () => {
    generateWords();
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <div className="app">
      <div className="container">
        <div className="header">
          <h1>SpeedType ID</h1>
          <div className="stats">
            <div className="stat">
              <span className="value">{stats.wpm}</span>
              <span className="label">WPM</span>
            </div>
            <div className="stat">
              <span className="value">{time}s</span>
              <span className="label">Time</span>
            </div>
            <div className="stat">
              <span className="value">{stats.accuracy}%</span>
              <span className="label">Accuracy</span>
            </div>
          </div>
        </div>

        <div className="typing-area">
          <div className="words-container">
            {words.map((word, wordIndex) => (
              <div key={wordIndex} className="word">
                {[...word].map((char, charIndex) => (
                  <span
                    key={charIndex}
                    className={`char ${getWordClass(wordIndex, charIndex, char)} ${
                      wordIndex === currentIndex && charIndex === input.length ? 'cursor' : ''
                    }`}
                  >
                    {char}
                  </span>
                ))}
                {wordIndex < words.length - 1 && <span className="space"> </span>}
              </div>
            ))}
          </div>
          
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            className="hidden-input"
            autoFocus
          />
        </div>

        <div className="controls">
          <button onClick={restartTest} className="restart-btn">
            Restart Test
          </button>
          <div className="hint">
            Press <kbd>ESC</kbd> to restart • Type the words as fast as you can!
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;