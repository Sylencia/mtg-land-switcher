import React from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'

import styles from './LandFilter.module.scss'

export const LandFilter = ({ landData, landType, setLandData, closeModal }) => {
  const filteredLands = landData[landType]
  const activeLandCount = filteredLands.filter(land => land.selectable).length

  const onLandClick = name => {
    const foundLand = filteredLands.find(land => land.name === name)
    foundLand.selectable = !foundLand.selectable
    setLandData({
      ...landData,
      [landType]: filteredLands,
    })
  }

  return (
    <div>
      <h3 className={styles.heading}>
        {landType}: {activeLandCount} options active
      </h3>
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
          className={styles.button}
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
  landType: PropTypes.string.isRequired,
  setLandData: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
}
