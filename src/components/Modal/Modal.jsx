import React from 'react'
import { createPortal } from 'react-dom'

import styles from './Modal.module.css'

export const Modal = ({ children, onClose, isOpen }) =>
  isOpen
    ? createPortal(
        <div className={styles.modal} onClick={onClose}>
          {children}
        </div>,
        document.body
      )
    : null
