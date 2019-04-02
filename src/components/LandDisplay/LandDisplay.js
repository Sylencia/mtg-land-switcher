import React from 'react'
import PropTypes from 'prop-types'

import styles from './LandDisplay.module.scss'

export const LandDisplay = ({ lands, onClick }) => (
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
          />
          <button className={styles.button} onClick={onClick}>
            Filter {landType} options
          </button>
        </div>
      )
    })}
  </div>
)

LandDisplay.propTypes = {
  lands: PropTypes.shape().isRequired,
  onClick: PropTypes.func.isRequired,
}
