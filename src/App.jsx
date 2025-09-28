import { useState, useEffect } from 'react'
import TypingTest from './components/TypingTest'
import Results from './components/Results'
import './App.css'

function App() {
  const [testStarted, setTestStarted] = useState(false)
  const [testCompleted, setTestCompleted] = useState(false)
  const [results, setResults] = useState(null)
  const [settings, setSettings] = useState({
    timeLimit: 60,
    mode: 'words',
    language: 'indonesia'
  })

  const startTest = () => {
    setTestStarted(true)
    setTestCompleted(false)
    setResults(null)
  }

  const endTest = (resultData) => {
    setTestCompleted(true)
    setTestStarted(false)
    setResults(resultData)
  }

  const resetTest = () => {
    setTestStarted(false)
    setTestCompleted(false)
    setResults(null)
  }

  const updateSettings = (newSettings) => {
    setSettings({...settings, ...newSettings})
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>SpeedType</h1>
        <p>Test kecepatan mengetik Anda</p>
      </header>

      {!testStarted && !testCompleted && (
        <div className="settings-panel">
          <div className="setting-group">
            <label>Waktu:</label>
            <div className="button-group">
              {[15, 30, 60].map(time => (
                <button
                  key={time}
                  className={settings.timeLimit === time ? 'active' : ''}
                  onClick={() => updateSettings({timeLimit: time})}
                >
                  {time}s
                </button>
              ))}
            </div>
          </div>

          <div className="setting-group">
            <label>Mode:</label>
            <div className="button-group">
              <button
                className={settings.mode === 'words' ? 'active' : ''}
                onClick={() => updateSettings({mode: 'words'})}
              >
                Kata
              </button>
              <button
                className={settings.mode === 'paragraph' ? 'active' : ''}
                onClick={() => updateSettings({mode: 'paragraph'})}
              >
                Paragraf
              </button>
            </div>
          </div>

          <div className="setting-group">
            <label>Bahasa:</label>
            <div className="button-group">
              <button
                className={settings.language === 'indonesia' ? 'active' : ''}
                onClick={() => updateSettings({language: 'indonesia'})}
              >
                Indonesia
              </button>
              <button
                className={settings.language === 'english' ? 'active' : ''}
                onClick={() => updateSettings({language: 'english'})}
              >
                English
              </button>
            </div>
          </div>

          <button className="start-button" onClick={startTest}>
            Mulai Test
          </button>
        </div>
      )}

      {testStarted && (
        <TypingTest 
          settings={settings}
          onTestEnd={endTest}
        />
      )}

      {testCompleted && results && (
        <Results 
          results={results}
          onRestart={resetTest}
        />
      )}
    </div>
  )
}

export default App