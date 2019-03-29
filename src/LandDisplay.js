import React, { Fragment } from 'react'
import { getRandomisedLands } from './LandUtils'
import PropTypes from 'prop-types'

import './LandDisplay.css'

const LandDisplay = ({ lands, setRandomLands }) => {
  return (
    <Fragment>
      <div className="land-container">
        {Object.entries(lands).map(land => {
          const [landType, landString] = land
          const [, setCode, setNumber] = landString.split(' ')
          const formattedCode = setCode.replace(/[()]/g, '').toLowerCase()
          const realSetCode = formattedCode === 'dar' ? 'dom' : formattedCode
          return (
            <div key={landType} className="land">
              <img
                className="land-image"
                src={`https://img.scryfall.com/cards/art_crop/en/${realSetCode}/${setNumber}.jpg`}
                alt={landString}
              />
              {landString}
            </div>
          )
        })}
      </div>
      <div className="randomise-button">
        <button onClick={() => setRandomLands(getRandomisedLands())}>
          Randomise
        </button>
      </div>
    </Fragment>
  )
}

LandDisplay.propTypes = {
  lands: PropTypes.shape().isRequired,
  setRandomLands: PropTypes.func.isRequired,
}

export default LandDisplay
