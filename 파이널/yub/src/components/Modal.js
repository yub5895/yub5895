import { useState } from "react";
import "../assets/Modal.scss";

const Modal = ({ isOpen, onClose, onEsc }) => {
  if (!isOpen) return null;
  return (
    <div className="modal">
      <div className="modal-container" onKeyUp={onEsc}>
        <div className="modal-header">
          <h1>게시글 작성</h1>
        </div>
        <div className="modal-main">
          <h2>내용</h2>
          <input></input>
        </div>
        <button onClick={onClose}>작성</button>
      </div>
    </div>
  );
};

export default Modal;
