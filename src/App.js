import React, { useState, Fragment } from 'react'
import { getRandomisedLands } from './LandUtils'
import { DeckEntry } from './components/DeckEntry'
import { LandDisplay } from './components/LandDisplay'
import { LandFilter } from './components/LandFilter'
import { Modal } from './components/Modal'
import { ModifierBar } from './components/ModifierBar'
import lands from './data/lands.json'
import styles from './App.module.scss'
import './stylesheets/global.module.scss'

const App = () => {
  const [userDeck, setUserDeck] = useState('')
  const [landData, setLandData] = useState(lands)
  const [randomLands, setRandomLands] = useState(getRandomisedLands(landData))
  const [modalOpen, setModalOpen] = useState(false)

  const closeModal = () => {
    setModalOpen(false)
    getNewLands()
    document.body.classList.remove(styles.modalOpen)
  }

  const getNewLands = () => {
    setRandomLands(getRandomisedLands(landData))
  }

  const openModal = () => {
    setModalOpen(true)
    document.body.classList.add(styles.modalOpen)
  }

  return (
    <Fragment>
      <Modal isOpen={modalOpen}>
        <LandFilter
          landData={landData}
          setLandData={setLandData}
          closeModal={closeModal}
        />
      </Modal>
      <div className={styles.app}>
        <h1 className={styles.header}>basic.landcycling</h1>
        <DeckEntry
          deck={userDeck}
          newLands={randomLands}
          updateDeck={setUserDeck}
        />
        <LandDisplay lands={randomLands} />
        <ModifierBar setRandomLands={getNewLands} openFilter={openModal} />
      </div>
    </Fragment>
  )
}

export default App
