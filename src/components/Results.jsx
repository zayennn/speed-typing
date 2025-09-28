import './Results.css'

const Results = ({ results, onRestart }) => {
  return (
    <div className="results">
      <h2>Hasil Test</h2>
      
      <div className="result-stats">
        <div className="stat">
          <div className="value">{results.wpm}</div>
          <div className="label">KPM</div>
        </div>
        
        <div className="stat">
          <div className="value">{results.accuracy}%</div>
          <div className="label">Akurasi</div>
        </div>
        
        <div className="stat">
          <div className="value">{results.correctChars}</div>
          <div className="label">Karakter Benar</div>
        </div>
        
        <div className="stat">
          <div className="value">{results.incorrectChars}</div>
          <div className="label">Karakter Salah</div>
        </div>
      </div>
      
      <button className="restart-button" onClick={onRestart}>
        Test Lagi
      </button>
    </div>
  )
}

export default Results