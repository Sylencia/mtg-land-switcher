import React from 'react'
import PropTypes from 'prop-types'

import styles from './LandFilter.module.css'

export const LandFilter = ({ landData, landType }) => {
  const filteredLands = landData[landType]
  return (
    <div className={styles.container}>
      {filteredLands.map(land => (
        <div key={land.name} className={styles.land}>
          {land.name}
          <img className={styles.image} src={land.imageUrl} alt={land.name} />
        </div>
      ))}
    </div>
  )
}

LandFilter.propTypes = {
  landData: PropTypes.shape().isRequired,
  landType: PropTypes.string.isRequired,
}
