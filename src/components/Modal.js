import React from "react";
import "../styles/modal.css";
import close from "../assets/Close.png";

const handleModalNewNoteClick = (e) => {
  e.stopPropagation();
};

const Modal = ({ isOpen, closeModal, children }) => {
  return (
    <div className={`modal ${isOpen && "modalOpen"}`} onClick={closeModal}>
      <div className="modalNewNote" onClick={handleModalNewNoteClick}>
        <button id="btnCloseModal" onClick={closeModal}>
          <img id="btnClose" src={close} alt="close" />
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
