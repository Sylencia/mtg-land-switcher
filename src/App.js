import React, { useState, createRef, Fragment } from 'react'
import { changeLandsInDeck, getRandomisedLands } from './LandUtils'
import { LandDisplay } from './components/LandDisplay'
import { LandFilter } from './components/LandFilter'
import { Modal } from './components/Modal'
import { Randomise } from './components/Randomise'
import lands from './data/lands.json'
import styles from './App.module.css'

const App = () => {
  const [userDeck, setUserDeck] = useState('')
  const [landData, setLandData] = useState(lands)
  const [randomLands, setRandomLands] = useState(getRandomisedLands(landData))
  const [modalOpen, setModalOpen] = useState(false)
  const [modalLand, setModalLand] = useState('Island')
  const newDeckRef = createRef()

  const closeModal = () => {
    setModalOpen(false)
    getNewLands()
  }

  const getNewLands = () => {
    console.log(landData)
    setRandomLands(getRandomisedLands(landData))
  }

  const openModal = landType => {
    setModalOpen(true)
    setModalLand(landType)
  }

  return (
    <Fragment>
      <Modal isOpen={modalOpen}>
        <LandFilter
          landData={landData}
          landType={modalLand}
          setLandData={setLandData}
          closeModal={closeModal}
        />
      </Modal>
      <div className={styles.app}>
        <div className={styles.deckSection}>
          <div className={styles.deckContainer}>
            <span className={styles.title}>Input</span>
            <textarea
              className={styles.textarea}
              value={userDeck}
              onChange={e => setUserDeck(e.target.value)}
              spellCheck="false"
            />
          </div>
          <span className={styles.arrow}>➡</span>
          <div className={styles.deckContainer}>
            <span className={styles.title}>Output</span>
            <textarea
              className={styles.textarea}
              readOnly
              ref={newDeckRef}
              value={changeLandsInDeck(userDeck, randomLands)}
              onClick={() => newDeckRef.current.select()}
              spellCheck="false"
            />
          </div>
        </div>
        <LandDisplay lands={randomLands} onClick={openModal} />
        <Randomise setRandomLands={getNewLands} />
      </div>
    </Fragment>
  )
}

export default App
