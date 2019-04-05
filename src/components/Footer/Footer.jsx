import React from 'react'
import PropTypes from 'prop-types'
import styles from './Footer.module.scss'

const setToNumber = value => {
  const parsedVal = parseInt(value)
  if (Number.isInteger(parsedVal)) {
    return parsedVal
  }
  return 1
}

export const Footer = ({ userLang, setUserLang, numLands, setNumLands }) => (
  <div className={styles.main}>
    <div className={styles.innerContainer}>
      <div className={styles.options}>
        <h5 className={styles.header}>Options</h5>
        <div className={styles.optionSection}>
          <span className={styles.optionTitle}>Language</span>
          <select
            className={styles.select}
            value={userLang}
            onChange={e => setUserLang(e.target.value)}
          >
            <option value="en">English</option>
            <option value="es">Spanish</option>
            <option value="fr">French</option>
            <option value="de">German</option>
            <option value="it">Italian</option>
            <option value="pt">Portuguese</option>
            <option value="ja">Japanese</option>
            <option value="ru">Russian</option>
          </select>
        </div>
        <div>
          <span className={styles.optionTitle}>Convert to</span>
          <input
            className={styles.maxLands}
            value={numLands}
            type="number"
            min="0"
            max="100"
            onChange={e => setNumLands(setToNumber(e.target.value))}
          />
          <span className={styles.optionTitle}> different land art(s)</span>
          <div className={styles.helperText}>
            {`This setting will attempt to convert one land to X land arts.`}
            <br />
            {`0 = As many land arts as possible, 1 = one land art (default), 2 = two land arts etc.`}
          </div>
        </div>
      </div>
      <div className={styles.credits}>
        <h5 className={styles.header}>Credits</h5>
        <ul className={styles.list}>
          <li>Landcycler created by Sylencia</li>
          <li>
            {'Land images provided by '}
            <a className={styles.link} href="https://scryfall.com/">
              Scryfall
            </a>
          </li>
          <li>
            {'Mana icons provided by '}
            <a
              className={styles.link}
              href="https://andrewgioia.github.io/Mana/"
            >
              Andrew Gioia
            </a>
          </li>
        </ul>
      </div>
      <div className={styles.contact}>
        <h5 className={styles.header}>Contact me</h5>
        <ul className={styles.list}>
          <li>
            <a className={styles.link} href="https://www.reddit.com/u/Sylencia">
              Reddit
            </a>
          </li>
          <li>
            <a className={styles.link} href="https://github.com/Sylencia">
              Github
            </a>
          </li>
        </ul>
      </div>
    </div>
  </div>
)

Footer.propTypes = {
  userLang: PropTypes.string.isRequired,
  setUserLang: PropTypes.func.isRequired,
  numLands: PropTypes.number.isRequired,
  setNumLands: PropTypes.func.isRequired,
}
