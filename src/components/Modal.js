import React from 'react';
import '../styles/Modal.css';

const Modal = ({ message, onConfirm, onCancel, ConfirmMsg = "Yes", CancelMsg = "No" }) => {
    return (
        <div className="modal">
            <div className="modal-content">
                <p>{message}</p>
                <div className="modal-buttons">
                    <button className="confirm-btn" onClick={onConfirm}>{ConfirmMsg}</button>
                    <button className="cancel-btn" onClick={onCancel}>{CancelMsg}</button>
                </div>
            </div>
        </div>
    );
};

export default Modal;
