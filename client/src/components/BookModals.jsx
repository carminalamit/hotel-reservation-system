// import { Modal } from 'react-bootstrap';
// import { FaCheckCircle } from "react-icons/fa";

// // declaration


// function StaticExample() {
//   return (
//     <div
//       className="modal show"
//       style={{ display: 'block', position: 'initial' }}
//     >
//       <Modal.Dialog>
//         <Modal.Header closeButton>
//           <Modal.Title>Welcome to The Richmonde Hotel & Suites</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <p>Thank you for booking with us. Your room was booked successfull!</p>
//         </Modal.Body>
//         <Modal.Footer><FaCheckCircle /></Modal.Footer>
//       </Modal.Dialog>
//     </div>
//   );
// }

// export default StaticExample;

import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function BookModals({show, handleClose}) {
  return (
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
  );
}

export default BookModals;