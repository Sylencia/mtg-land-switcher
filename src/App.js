import React, { useState, createRef } from 'react'
import { randomiseLands } from './LandUtils'
import './App.css'

const App = () => {
  const [userDeck, setUserDeck] = useState('')
  const newDeckRef = createRef()

  return (
    <div className="app">
      <div className="deck-container">
        <span className="deck-title">Input</span>
        <textarea
          className="deck-ta"
          value={userDeck}
          onChange={e => setUserDeck(e.target.value)}
          spellCheck="false"
        />
      </div>
      <span className="right-arrow">➡</span>
      <div className="deck-container">
        <span className="deck-title">Output</span>
        <textarea
          className="deck-ta"
          readOnly
          ref={newDeckRef}
          value={randomiseLands(userDeck)}
          onClick={() => newDeckRef.current.select()}
          spellCheck="false"
        />
      </div>
    </div>
  )
}

export default App
