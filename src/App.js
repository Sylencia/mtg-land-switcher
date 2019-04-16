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
  const [filteredLands, setFilteredLands] = useLocalStorage('filteredLands', {
    Plains: [],
    Island: [],
    Swamp: [],
    Mountain: [],
    Forest: [],
  })

  const [randomLands, setRandomLands] = useState({})
  useEffect(() => {
    setRandomLands(getRandomisedLands(filteredLands, 'all'))
  }, [])

  console.log(randomLands)
  const [modalOpen, setModalOpen] = useState(false)

  const closeModal = () => {
    setModalOpen(false)
    getNewLands('all')
  }

  const getNewLands = (land = 'all') => {
    setRandomLands(getRandomisedLands(filteredLands, land, randomLands))
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
          filteredLands={filteredLands}
          setFilteredLands={setFilteredLands}
          landData={lands}
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
