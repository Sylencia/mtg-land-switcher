import React from 'react'
import PropTypes from 'prop-types'
import styles from './Randomise.module.scss'

export const Randomise = ({ openFilter, setRandomLands }) => (
  <div className={styles.button}>
    <button className="main-button" onClick={openFilter}>
      Filter
    </button>

    <button className="main-button" onClick={setRandomLands}>
      Randomise
    </button>
  </div>
)

Randomise.propTypes = {
  setRandomLands: PropTypes.func.isRequired,
  openFilter: PropTypes.func.isRequired,
}
