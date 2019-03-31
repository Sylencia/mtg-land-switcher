import React from 'react'
import PropTypes from 'prop-types'
import styles from './Randomise.module.css'

export const Randomise = ({ setRandomLands }) => (
  <div className={styles.button}>
    <button onClick={setRandomLands}>Randomise</button>
  </div>
)

Randomise.propTypes = {
  setRandomLands: PropTypes.func.isRequired,
}
