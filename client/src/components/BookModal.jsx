import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { FaCheck } from "react-icons/fa";

function BookModals({ show, handleClose }) {
  return (
    <Modal
      className="popup center"
      show={show}
      onHide={handleClose}
      style={{ width: "350px"}}
    >
      <div className="icon">
        <FaCheck />
      </div>
      <div className="title">Thank You!</div>
      <div className="description">Your room was booked successfully.</div>
      <div className="ok-btn">
        <button id="popup-btn">OK</button>
      </div>
    </Modal>
  );
}

export default BookModals;
