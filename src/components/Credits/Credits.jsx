import React from 'react'
import styles from './Credits.module.scss'

export const Credits = () => (
  <div className={styles.main}>
    <div className={styles.innerContainer}>
      <div className={styles.guide}>
        <h5 className={styles.header}>Usage Tips</h5>
        <ul className={styles.guideList}>
          <li>Clicking on an image will reshuffle that land only.</li>
        </ul>
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
