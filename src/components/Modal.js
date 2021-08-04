import React from "react";
import '../styles/modal.css'

const handleModalNewNoteClick = (e) => {
    e.stopPropagation();
}

const Modal = ({ isOpen, closeModal, children }) => {
  return (
    <div className={`modal ${isOpen && 'modalOpen'}`} onClick={closeModal}>
        <div className="modalNewNote" onClick={handleModalNewNoteClick}>
     
      <button onClick={closeModal}>
          X
      </button>
      {children}
      </div>
    </div>
  );
};

export default Modal;
