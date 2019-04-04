import React, { useState, useEffect, Fragment } from 'react'
import { getRandomisedLands } from './LandUtils'
import { DeckEntry } from './components/DeckEntry'
import { LandDisplay } from './components/LandDisplay'
import { LandFilter } from './components/LandFilter'
import { Modal } from './components/Modal'
import { ModifierBar } from './components/ModifierBar'
import { Footer } from './components/Footer'
import lands from './data/lands.json'
import styles from './App.module.scss'
import './stylesheets/global.module.scss'

const App = () => {
  const [userLang, setUserLang] = useState('en')
  useEffect(() => {
    const savedLanguage = localStorage.getItem('language')

    if (savedLanguage) {
      setUserLang(savedLanguage)
    } else {
      localStorage.setItem('language', userLang)
    }
  }, [])

  const [landData, setLandData] = useState(lands.data)
  useEffect(() => {
    const savedVersion = localStorage.getItem('version') || 0
    const savedData = localStorage.getItem('data')
    if (lands.version <= savedVersion && savedData) {
      setLandData(JSON.parse(savedData))
    } else {
      localStorage.setItem('data', JSON.stringify(lands.data))
      localStorage.setItem('version', lands.version)
    }
  }, [])

  const [userDeck, setUserDeck] = useState('')
  const [randomLands, setRandomLands] = useState({})
  useEffect(() => {
    const savedVersion = localStorage.getItem('version') || 0
    const savedData = localStorage.getItem('data')
    if (lands.version <= savedVersion && savedData) {
      setRandomLands(getRandomisedLands(JSON.parse(savedData), 'all'))
    } else {
      setRandomLands(getRandomisedLands(landData, 'all'))
    }
  }, [])
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
    localStorage.setItem('version', lands.version)
    localStorage.setItem('data', JSON.stringify(landData))
    document.body.classList.remove(styles.modalOpen)
  }

  const changeLanguage = newLang => {
    setUserLang(newLang)
    localStorage.setItem('language', newLang)
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
          userLang={userLang}
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
          userLang={userLang}
        />
        <LandDisplay
          lands={randomLands}
          setRandomLands={getNewLands}
          userLang={userLang}
        />
        <ModifierBar setRandomLands={getNewLands} openFilter={openModal} />
      </div>
      <Footer userLang={userLang} setUserLang={changeLanguage} />
    </Fragment>
  )
}

export default App
