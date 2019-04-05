import React, { useState, useEffect, Fragment, createRef } from 'react'
import { getRandomisedLands } from './utils/LandUtils'
import { useLocalStorage } from './utils/Hooks'
import { DeckEntry } from './components/DeckEntry'
import { LandDisplay } from './components/LandDisplay'
import { LandFilter } from './components/LandFilter'
import { Modal } from './components/Modal'
import { ModifierBar } from './components/ModifierBar'
import { Footer } from './components/Footer'
import lands from './data/lands.json'
import gear from './images/settings.svg'
import styles from './App.module.scss'
import './stylesheets/global.module.scss'

const App = () => {
  const footerRef = createRef()
  const [numLands, setNumLands] = useLocalStorage('numLands', '1')
  const [userLang, setUserLang] = useLocalStorage('language', 'en')

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
    getNewLands('all')
    localStorage.setItem('version', lands.version)
    localStorage.setItem('data', JSON.stringify(landData))
  }

  const getNewLands = (land = 'all') => {
    setRandomLands(getRandomisedLands(landData, land, randomLands))
  }

  const scrollToFooter = () => {
    window.scrollTo({
      top: footerRef.current.offsetTop,
      behavior: 'smooth',
    })
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
        <button className={styles.settings} onClick={scrollToFooter}>
          <img src={gear} alt="Settings" />
        </button>
        <div className={styles.landIcons}>
          <i className="ms ms-cost ms-w" />
          <i className="ms ms-cost ms-u" />
          <i className="ms ms-cost ms-b" />
          <i className="ms ms-cost ms-r" />
          <i className="ms ms-cost ms-g" />
        </div>
        <DeckEntry
          newLands={randomLands}
          userLang={userLang}
          numLands={parseInt(numLands)}
        />
        <LandDisplay
          lands={randomLands}
          setRandomLands={getNewLands}
          userLang={userLang}
        />
        <ModifierBar
          setRandomLands={getNewLands}
          openFilter={() => setModalOpen(true)}
        />
      </div>
      <div ref={footerRef}>
        <Footer
          userLang={userLang}
          setUserLang={setUserLang}
          numLands={numLands}
          setNumLands={setNumLands}
        />
      </div>
    </Fragment>
  )
}

export default App
