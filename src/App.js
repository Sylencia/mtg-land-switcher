import React, { useState, Fragment } from 'react'
import { getRandomisedLands } from './LandUtils'
import { DeckEntry } from './components/DeckEntry'
import { LandDisplay } from './components/LandDisplay'
import { LandFilter } from './components/LandFilter'
import { Modal } from './components/Modal'
import { ModifierBar } from './components/ModifierBar'
import { Credits } from './components/Credits'
import lands from './data/lands.json'
import styles from './App.module.scss'
import './stylesheets/global.module.scss'

const App = () => {
  const [userDeck, setUserDeck] = useState('')
  const [landData, setLandData] = useState(lands)
  const [randomLands, setRandomLands] = useState(
    getRandomisedLands(landData, 'all')
  )
  const [modalOpen, setModalOpen] = useState(false)

  const closeModal = () => {
    setModalOpen(false)
    Object.entries(randomLands).forEach(([rLandType, rLandData]) => {
      const info = landData[rLandType].find(
        dataLand => dataLand.name === rLandData.name
      )

      if (!info.selectable) {
        getNewLands(rLandType)
      }
    })
    document.body.classList.remove(styles.modalOpen)
  }

  const getNewLands = (land = 'all') => {
    setRandomLands(getRandomisedLands(landData, land, randomLands))
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
        <h1 className={styles.header}>Landcycler</h1>
        <div className={styles.landIcons}>
          <i className="ms ms-cost ms-w" />
          <i className="ms ms-cost ms-u" />
          <i className="ms ms-cost ms-b" />
          <i className="ms ms-cost ms-r" />
          <i className="ms ms-cost ms-g" />
        </div>
        <DeckEntry
          deck={userDeck}
          newLands={randomLands}
          updateDeck={setUserDeck}
        />
        <LandDisplay lands={randomLands} setRandomLands={getNewLands} />
        <ModifierBar setRandomLands={getNewLands} openFilter={openModal} />
      </div>
      <Credits />
    </Fragment>
  )
}

export default App
