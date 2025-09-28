import { useState, useEffect, useRef } from 'react'
import Timer from './Timer'
import { getWordList } from '../data/wordLists'
import './TypingTest.css'

const TypingTest = ({ settings, onTestEnd }) => {
  const [words, setWords] = useState([])
  const [userInput, setUserInput] = useState('')
  const [currentWordIndex, setCurrentWordIndex] = useState(0)
  const [correctChars, setCorrectChars] = useState(0)
  const [incorrectChars, setIncorrectChars] = useState(0)
  const [startTime, setStartTime] = useState(null)
  const [isTestActive, setIsTestActive] = useState(false)
  const inputRef = useRef(null)

  useEffect(() => {
    const wordList = getWordList(settings.language, settings.mode)
    setWords(wordList)
    setUserInput('')
    setCurrentWordIndex(0)
    setCorrectChars(0)
    setIncorrectChars(0)
    setStartTime(null)
    setIsTestActive(false)
    
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [settings])

  const handleInputChange = (e) => {
    const value = e.target.value.toLowerCase()
    
    if (!isTestActive) {
      setIsTestActive(true)
      setStartTime(Date.now())
    }

    if (settings.mode === 'words') {
      // Mode per kata
      if (value.endsWith(' ')) {
        const typedWord = value.trim()
        const currentWord = words[currentWordIndex]
        
        // Hitung karakter yang benar dan salah
        const minLength = Math.min(typedWord.length, currentWord.length)
        for (let i = 0; i < minLength; i++) {
          if (typedWord[i] === currentWord[i]) {
            setCorrectChars(prev => prev + 1)
          } else {
            setIncorrectChars(prev => prev + 1)
          }
        }
        
        // Jika kata yang diketik lebih panjang dari kata sebenarnya
        if (typedWord.length > currentWord.length) {
          setIncorrectChars(prev => prev + (typedWord.length - currentWord.length))
        }
        
        // Jika kata yang diketik lebih pendek dari kata sebenarnya
        if (typedWord.length < currentWord.length) {
          setIncorrectChars(prev => prev + (currentWord.length - typedWord.length))
        }
        
        setCurrentWordIndex(prev => prev + 1)
        setUserInput('')
        
        // Jika sudah mencapai akhir daftar kata, reset atau selesaikan test
        if (currentWordIndex >= words.length - 1) {
          const newWordList = getWordList(settings.language, settings.mode)
          setWords(newWordList)
          setCurrentWordIndex(0)
        }
      } else {
        setUserInput(value)
      }
    } else {
      // Mode paragraf
      setUserInput(value)
      
      // Hitung karakter yang benar dan salah
      const minLength = Math.min(value.length, words[0].length)
      let correct = 0
      let incorrect = 0
      
      for (let i = 0; i < minLength; i++) {
        if (value[i] === words[0][i]) {
          correct++
        } else {
          incorrect++
        }
      }
      
      // Jika input lebih panjang dari paragraf
      if (value.length > words[0].length) {
        incorrect += value.length - words[0].length
      }
      
      setCorrectChars(correct)
      setIncorrectChars(incorrect)
      
      // Jika sudah mengetik seluruh paragraf
      if (value.length >= words[0].length) {
        handleTestEnd()
      }
    }
  }

  const handleTestEnd = () => {
    const endTime = Date.now()
    const timeElapsed = (endTime - startTime) / 1000 // dalam detik
    
    const totalChars = correctChars + incorrectChars
    const wpm = totalChars > 0 ? Math.round((correctChars / 5) / (timeElapsed / 60)) : 0
    const accuracy = totalChars > 0 ? Math.round((correctChars / totalChars) * 100) : 0
    
    onTestEnd({
      wpm,
      accuracy,
      correctChars,
      incorrectChars,
      timeElapsed: Math.round(timeElapsed)
    })
  }

  const handleTimeUp = () => {
    handleTestEnd()
  }

  const renderWords = () => {
    if (settings.mode === 'words') {
      return words.map((word, index) => {
        let className = 'word'
        if (index === currentWordIndex) {
          className += ' current'
        }
        
        return (
          <span key={index} className={className}>
            {word.split('').map((char, charIndex) => {
              let charClass = 'char'
              if (index < currentWordIndex) {
                // Kata yang sudah diketik
                charClass += ' typed'
              } else if (index === currentWordIndex) {
                // Kata yang sedang diketik
                if (charIndex < userInput.length) {
                  if (userInput[charIndex] === char) {
                    charClass += ' correct'
                  } else {
                    charClass += ' incorrect'
                  }
                }
              }
              return <span key={charIndex} className={charClass}>{char}</span>
            })}
          </span>
        )
      })
    } else {
      // Mode paragraf
      return (
        <div className="paragraph">
          {words[0].split('').map((char, index) => {
            let charClass = 'char'
            if (index < userInput.length) {
              if (userInput[index] === char) {
                charClass += ' correct'
              } else {
                charClass += ' incorrect'
              }
            }
            return <span key={index} className={charClass}>{char}</span>
          })}
        </div>
      )
    }
  }

  return (
    <div className="typing-test">
      <div className="test-header">
        <Timer 
          duration={settings.timeLimit} 
          isActive={isTestActive}
          onTimeUp={handleTimeUp}
        />
      </div>
      
      <div className="text-display">
        {renderWords()}
      </div>
      
      <div className="input-area">
        <input
          ref={inputRef}
          type="text"
          value={userInput}
          onChange={handleInputChange}
          autoFocus
          disabled={!isTestActive}
        />
      </div>
    </div>
  )
}

export default TypingTest