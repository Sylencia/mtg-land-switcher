import React, { createRef } from 'react'
import PropTypes from 'prop-types'
import { changeLandsInDeck } from '../../LandUtils'
import styles from './DeckEntry.module.scss'

export const DeckEntry = ({ deck, newLands, updateDeck }) => {
  const newDeckRef = createRef()

  return (
    <div className={styles.deckSection}>
      <div className={styles.deckContainer}>
        <span className={styles.title}>Imported Deck</span>
        <textarea
          className={styles.deckDisplay}
          value={deck}
          onChange={e => updateDeck(e.target.value)}
          spellCheck="false"
        />
      </div>
      <span className={styles.arrow}>➡</span>
      <div className={styles.deckContainer}>
        <span className={styles.title}>Export to MTG Arena</span>
        <textarea
          className={styles.deckDisplay}
          readOnly
          ref={newDeckRef}
          value={changeLandsInDeck(deck, newLands)}
          onClick={() => newDeckRef.current.select()}
          spellCheck="false"
        />
      </div>
    </div>
  )
}

DeckEntry.propTypes = {
  deck: PropTypes.string.isRequired,
  newLands: PropTypes.shape().isRequired,
  updateDeck: PropTypes.func.isRequired,
}
