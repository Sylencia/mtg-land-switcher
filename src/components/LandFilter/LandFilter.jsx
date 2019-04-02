import React, { useState, Fragment } from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'

import styles from './LandFilter.module.scss'

export const LandFilter = ({ landData, setLandData, closeModal }) => {
  const [tab, setTab] = useState('Plains')
  const updateActiveTab = e => setTab(e.target.id)

  const allLands = Object.keys(landData)

  const tabs = allLands.reduce((allTabs, land) => {
    const data = landData[land]
    const activeLandCount = data.filter(land => land.selectable).length
    const label = `${land} (${activeLandCount})`

    allTabs.push(
      <Fragment>
        <input
          className={cx(styles.input, styles[land.toLowerCase()])}
          id={land}
          type="radio"
          checked={tab === land}
          onChange={updateActiveTab}
        />
        <label className={styles.label} htmlFor={land}>
          <span>{land}</span>
          <span className={styles.landCountLabel}>({activeLandCount})</span>
        </label>
      </Fragment>
    )
    return allTabs
  }, [])

  const filteredLands = landData[tab]
  const activeLandCount = filteredLands.filter(land => land.selectable).length

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
        {filteredLands.map(land => (
          <div
            key={land.name}
            className={cx(styles.land, { [styles.removed]: !land.selectable })}
            onClick={() => onLandClick(land.name)}
          >
            {land.name}
            <img className={styles.image} src={land.imageUrl} alt={land.name} />
          </div>
        ))}
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
}
