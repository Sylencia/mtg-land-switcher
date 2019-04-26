import React, { useState, Fragment } from 'react'
import _includes from 'lodash/includes'
import PropTypes from 'prop-types'
import cx from 'classnames'

import { useLockBodyScroll } from '../../utils/Hooks'
import { translateLandName } from '../../utils/LandUtils'

import styles from './LandFilter.module.scss'

export const LandFilter = ({
  filteredLands,
  setFilteredLands,
  landData,
  closeModal,
  userLang,
}) => {
  useLockBodyScroll()
  const [tab, setTab] = useState('Plains')
  const updateActiveTab = e => setTab(e.target.id)

  const allLands = Object.keys(landData)

  const tabs = allLands.reduce((allTabs, land) => {
    const currentLandData = landData[land]
    const filteredLandNames = filteredLands[land]
    const activeLandCount = currentLandData.length - filteredLandNames.length
    const landName = translateLandName(land, userLang)

    allTabs.push(
      <Fragment key={`filter_${land}`}>
        <input
          className={cx(styles.input, styles[land.toLowerCase()])}
          id={land}
          type="radio"
          checked={tab === land}
          onChange={updateActiveTab}
        />
        <label className={styles.label} htmlFor={land}>
          <span>{landName}</span>
          <span className={styles.landCountLabel}>({activeLandCount})</span>
        </label>
      </Fragment>
    )
    return allTabs
  }, [])

  const currentTabData = landData[tab]
  const currentFilteredTab = filteredLands[tab]
  const activeLandCount = currentTabData.length - currentFilteredTab.length
  const filteredLandName = translateLandName(tab, userLang)

  const onLandClick = name => {
    const foundLand = currentFilteredTab.find(land => land === name)

    if (foundLand === undefined) {
      // Don't allow them to go below 1 active land
      if (activeLandCount === 1) {
        return
      }

      setFilteredLands({
        ...filteredLands,
        [tab]: [...currentFilteredTab, name],
      })
    } else {
      setFilteredLands({
        ...filteredLands,
        [tab]: currentFilteredTab.filter(land => land !== name),
      })
    }
  }

  return (
    <div>
      <div className={styles.tab}>{tabs}</div>
      <div className={styles.container}>
        {currentTabData.map(land => {
          const displayName = `${filteredLandName} ${land.name}`
          return (
            <div
              key={land.name}
              className={cx(styles.land, {
                [styles.removed]: _includes(currentFilteredTab, land.name),
              })}
              onClick={() => onLandClick(land.name)}
            >
              {displayName}
              <img
                className={styles.image}
                src={land.imageUrl}
                alt={displayName}
              />
            </div>
          )
        })}
      </div>
      <div className={styles.buttonContainer}>
        <button
          className="main-button"
          disabled={activeLandCount < 1}
          onClick={closeModal}
        >
          Save Filters
        </button>
      </div>
    </div>
  )
}

LandFilter.propTypes = {
  filteredLands: PropTypes.shape().isRequired,
  setFilteredLands: PropTypes.func.isRequired,
  landData: PropTypes.shape().isRequired,
  closeModal: PropTypes.func.isRequired,
  userLang: PropTypes.string.isRequired,
}
