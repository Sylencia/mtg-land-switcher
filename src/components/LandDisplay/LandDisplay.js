import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

import './LandDisplay.css'

export const LandDisplay = ({ lands }) => {
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
    </Fragment>
  )
}

LandDisplay.propTypes = {
  lands: PropTypes.shape().isRequired,
}
