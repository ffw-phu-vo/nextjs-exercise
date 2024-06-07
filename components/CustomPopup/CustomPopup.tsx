import React, { useState } from "react";
import Popup from "reactjs-popup";
import styles from "./CustomPopup.module.css";
import "reactjs-popup/dist/index.css";

interface ICustomPopup {
  button?: JSX.Element | string;
  children?: JSX.Element | string;
  isOpen: boolean;
  onConfirm: () => void;
}
const CustomPopup = ({ button, children, isOpen, onConfirm }: ICustomPopup) => {
  const [open, setOpen] = useState(isOpen);
  const closeModal = () => setOpen(false);
  return (
    <div>
      <button
        className="link"
        type="button"
        onClick={() => setOpen((o) => true)}
      >
        {button}
      </button>
      <Popup open={open} closeOnDocumentClick onClose={closeModal}>
        <div className={styles.modal}>
          <button className={styles.close} onClick={closeModal}>
            &times;
          </button>
          <div className={styles.header}> Modal Title </div>
          <div className={styles.content}>
            {children}
            <button className="btn" onClick={closeModal}>
              Cancel
            </button>
            <button className="btn" onClick={onConfirm}>
              Confirm
            </button>
          </div>
        </div>
      </Popup>
    </div>
  );
};

export default CustomPopup;
