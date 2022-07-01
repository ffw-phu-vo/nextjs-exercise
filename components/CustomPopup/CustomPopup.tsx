import React, { useState } from 'react'
import Popup from 'reactjs-popup';
import styles from './CustomPopup.module.css'
import 'reactjs-popup/dist/index.css';

interface ICustomPopup {
  button: JSX.Element | string;
  children?: JSX.Element | string;
}
const CustomPopup = ({button, children}:ICustomPopup) => {
  const [open, setOpen] = useState(false);
  const closeModal = () => setOpen(false);
  return (
    <div>
      <button className='link' type="button" onClick={() => setOpen(o => !o)}>
        {button}
      </button>
      <Popup open={open} closeOnDocumentClick onClose={closeModal}>
        <div className={styles.modal}>
          <button className={styles.close} onClick={closeModal}>
            &times;
          </button>
          <div className={styles.header}> Modal Title </div>
          <div className={styles.content}>
            <button className='btn' onClick={closeModal}>
              cancel
            </button>
            {children}
          </div>
        </div>
      </Popup>
    </div>
  )
}

export default CustomPopup
