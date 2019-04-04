import React, { createRef, useState } from 'react'
import PropTypes from 'prop-types'
import {
  transformToSingleLand,
  transformToMultipleLands,
} from '../../LandUtils'
import styles from './DeckEntry.module.scss'

export const DeckEntry = ({ newLands, userLang }) => {
  const newDeckRef = createRef()
  const [userDeck, setUserDeck] = useState('')

  console.log(transformToMultipleLands(userDeck, newLands, userLang))

  return (
    <div className={styles.deckSection}>
      <div className={styles.deckContainer}>
        <span className={styles.title}>Imported Deck</span>
        <textarea
          className={styles.deckDisplay}
          value={userDeck}
          onChange={e => setUserDeck(e.target.value)}
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
          value={transformToSingleLand(userDeck, newLands, userLang)}
          onClick={() => newDeckRef.current.select()}
          spellCheck="false"
        />
      </div>
    </div>
  )
}

DeckEntry.propTypes = {
  newLands: PropTypes.shape().isRequired,
  userLang: PropTypes.string.isRequired,
}
