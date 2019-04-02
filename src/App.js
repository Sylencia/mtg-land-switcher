import React, { useState } from 'react'
import cx from 'classnames'
import { getRandomisedLands } from './LandUtils'
import { DeckEntry } from './components/DeckEntry'
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

  const closeModal = () => {
    setModalOpen(false)
    getNewLands()
  }

  const getNewLands = () => {
    setRandomLands(getRandomisedLands(landData))
  }

  const openModal = () => {
    setModalOpen(true)
  }

  return (
    <div className={cx({ [styles.modalOpen]: modalOpen })}>
      <Modal isOpen={modalOpen}>
        <LandFilter
          landData={landData}
          setLandData={setLandData}
          closeModal={closeModal}
        />
      </Modal>
      <div className={styles.app}>
        <DeckEntry
          deck={userDeck}
          newLands={randomLands}
          updateDeck={setUserDeck}
        />
        <LandDisplay lands={randomLands} onClick={openModal} />
        <Randomise setRandomLands={getNewLands} />
      </div>
    </div>
  )
}

export default App
