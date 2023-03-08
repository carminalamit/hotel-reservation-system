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
import { FaCheckCircle } from "react-icons/fa";
import Modal from 'react-bootstrap/Modal';

function BookModals({show, handleClose}) {
  return (
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title style={{width: "600px"}} className='text-p'>Welcome to The Richmonde Hotel & Suites</Modal.Title>
        </Modal.Header>
        <Modal.Body className='text-p'>Thank you for booking with us. Your room was booked successfull!</Modal.Body>
        <Modal.Footer><FaCheckCircle /></Modal.Footer>
      </Modal>
  );
}

export default BookModals;