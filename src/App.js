import React, { useState, createRef } from 'react'
import { changeLandsInDeck, getRandomisedLands } from './LandUtils'
import { LandDisplay } from './components/LandDisplay'
import { Randomise } from './components/Randomise'
import './App.css'

const App = () => {
  const [userDeck, setUserDeck] = useState('')
  const [randomLands, setRandomLands] = useState(getRandomisedLands())
  const newDeckRef = createRef()

  return (
    <div className="app">
      <div className="deck-section">
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
            value={changeLandsInDeck(userDeck, randomLands)}
            onClick={() => newDeckRef.current.select()}
            spellCheck="false"
          />
        </div>
      </div>
      <LandDisplay lands={randomLands} />
      <Randomise setRandomLands={setRandomLands} />
    </div>
  )
}

export default App
