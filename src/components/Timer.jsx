import { useState, useEffect } from 'react'
import './Timer.css'

const Timer = ({ duration, isActive, onTimeUp }) => {
  const [timeLeft, setTimeLeft] = useState(duration)

  useEffect(() => {
    setTimeLeft(duration)
  }, [duration])

  useEffect(() => {
    let interval = null
    
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(time => {
          if (time <= 1) {
            clearInterval(interval)
            onTimeUp()
            return 0
          }
          return time - 1
        })
      }, 1000)
    } else if (!isActive && timeLeft !== duration) {
      clearInterval(interval)
    }
    
    return () => clearInterval(interval)
  }, [isActive, timeLeft, duration, onTimeUp])

  return (
    <div className="timer">
      <span className="time">{timeLeft}s</span>
    </div>
  )
}

export default Timer