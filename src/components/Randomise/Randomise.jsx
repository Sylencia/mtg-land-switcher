import React from 'react'
import PropTypes from 'prop-types'
import { getRandomisedLands } from '../../LandUtils'
import './Randomise.css'

export const Randomise = ({ setRandomLands }) => (
  <div className="randomise-button">
    <button onClick={() => setRandomLands(getRandomisedLands())}>
      Randomise
    </button>
  </div>
)

Randomise.propTypes = {
  setRandomLands: PropTypes.func.isRequired,
}
