import React from 'react'
import PropTypes from 'prop-types'
import styles from './ModifierBar.module.scss'

export const ModifierBar = ({ openFilter, setRandomLands }) => (
  <div className={styles.button}>
    <button className="main-button" onClick={openFilter}>
      Filter
    </button>

    <button className="main-button" onClick={setRandomLands}>
      Randomise
    </button>
  </div>
)

ModifierBar.propTypes = {
  setRandomLands: PropTypes.func.isRequired,
  openFilter: PropTypes.func.isRequired,
}
