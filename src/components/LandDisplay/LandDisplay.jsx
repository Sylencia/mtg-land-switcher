import React from 'react'
import PropTypes from 'prop-types'

import styles from './LandDisplay.module.scss'

export const LandDisplay = ({ lands, setRandomLands }) => (
  <div className={styles.container}>
    {Object.entries(lands).map(land => {
      const [landType, landData] = land
      return (
        <div key={landType} className={styles.land}>
          {landData.name}
          <img
            className={styles.image}
            src={landData.imageUrl}
            alt={landData.name}
            onClick={() => setRandomLands(landType)}
          />
        </div>
      )
    })}
  </div>
)

LandDisplay.propTypes = {
  lands: PropTypes.shape().isRequired,
  setRandomLands: PropTypes.func.isRequired,
}
