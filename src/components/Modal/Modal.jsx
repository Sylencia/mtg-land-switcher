import React from 'react'
import { createPortal } from 'react-dom'

import styles from './Modal.module.scss'

export const Modal = ({ children, isOpen }) =>
  isOpen
    ? createPortal(
        <div className={styles.modal}>{children}</div>,
        document.body
      )
    : null
