import React from 'react'
import PropTypes from 'prop-types'

import { translateLandName } from '../../LandUtils'

import styles from './LandDisplay.module.scss'

export const LandDisplay = ({ lands, setRandomLands, userLang }) => (
  <div className={styles.container}>
    {Object.entries(lands).map(land => {
      const [landType, landArray] = land
      // Only display the first of the shuffled array
      const landData = landArray[0]
      const tLandName = translateLandName(landType, userLang)
      const displayName = `${tLandName} ${landData.name}`
      return (
        <div key={landType} className={styles.land}>
          {displayName}
          <img
            className={styles.image}
            src={landData.imageUrl}
            alt={displayName}
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
  userLang: PropTypes.string.isRequired,
}
