import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";

function BookModals({ show, handleClose }) {
  return (
    <Modal className="pop-up1" show={show} onHide={handleClose}>
      <div className="pop-up2">
        {/* <Modal.Header className="ty"> */}
          <h2 className="ty">Thank You!</h2>
        {/* </Modal.Header> */}
        <p className="popup-body">Your room was booked successfully!</p>
        <Modal.Footer>
          <Button
            style={{ width: "285px" }}
            className="bg-black text-white"
            variant="secondary"
            onClick={handleClose}
          >
            OK
          </Button>
        </Modal.Footer>
      </div>
    </Modal>
  );
}

export default BookModals;
