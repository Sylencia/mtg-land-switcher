import React, { useState, Fragment } from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'

import { translateLandName } from '../../LandUtils'

import styles from './LandFilter.module.scss'

export const LandFilter = ({ landData, setLandData, closeModal, userLang }) => {
  const [tab, setTab] = useState('Plains')
  const updateActiveTab = e => setTab(e.target.id)

  const allLands = Object.keys(landData)

  const tabs = allLands.reduce((allTabs, land) => {
    const data = landData[land]
    const activeLandCount = data.filter(land => land.selectable).length
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

  const filteredLands = landData[tab]
  const activeLandCount = filteredLands.filter(land => land.selectable).length
  const filteredLandName = translateLandName(tab, userLang)

  const onLandClick = name => {
    const foundLand = filteredLands.find(land => land.name === name)
    // Don't allow them to go below 1 active land
    if (activeLandCount === 1 && foundLand.selectable) {
      return
    }

    foundLand.selectable = !foundLand.selectable
    setLandData({
      ...landData,
      [tab]: filteredLands,
    })
  }

  return (
    <div>
      <div className={styles.tab}>{tabs}</div>
      <div className={styles.container}>
        {filteredLands.map(land => {
          const displayName = `${filteredLandName} ${land.name}`
          return (
            <div
              key={land.name}
              className={cx(styles.land, {
                [styles.removed]: !land.selectable,
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
  landData: PropTypes.shape().isRequired,
  setLandData: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
  userLang: PropTypes.string.isRequired,
}
