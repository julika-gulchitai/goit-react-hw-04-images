import s from './Styles.module.css';
import { useEffect } from 'react';

export const Modal = ({ modalurl, closeModal }) => {
  const handleBackdropClick = e => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  useEffect(() => {
    const handleKeyDown = e => {
      if (e.key === 'Escape') {
        closeModal();
      }
    };
    document.addEventListener('keydown', handleKeyDown);

    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [closeModal]);
  return (
    <div className={s.Overlay} onClick={handleBackdropClick}>
      <div className={s.Modal}>
        <img src={modalurl} alt="tags" />
        <button className={s.closeButton} onClick={closeModal}>
          x
        </button>
      </div>
    </div>
  );
};
