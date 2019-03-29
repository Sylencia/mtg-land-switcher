import React, { useState, createRef } from 'react'
import { randomiseLands } from './LandUtils'
import './App.css'

const App = () => {
  const [userDeck, setUserDeck] = useState('')
  const newDeckRef = createRef()

  return (
    <div className="App">
      <header className="App-header">
        <div className="deck-container">
          Input
          <textarea
            className="input-ta"
            value={userDeck}
            onChange={e => setUserDeck(e.target.value)}
          />
        </div>
        <span className="right-arrow">➡</span>
        <div className="deck-container">
          Output
          <textarea
            className="input-ta"
            readOnly
            ref={newDeckRef}
            value={randomiseLands(userDeck)}
            onClick={() => newDeckRef.current.select()}
          />
        </div>
      </header>
    </div>
  )
}

export default App
