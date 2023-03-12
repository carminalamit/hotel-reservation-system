// // import { Modal } from 'react-bootstrap';
// // import { FaCheckCircle } from "react-icons/fa";

// // // declaration


// // function StaticExample() {
// //   return (
// //     <div
// //       className="modal show"
// //       style={{ display: 'block', position: 'initial' }}
// //     >
// //       <Modal.Dialog>
// //         <Modal.Header closeButton>
// //           <Modal.Title>Welcome to The Richmonde Hotel & Suites</Modal.Title>
// //         </Modal.Header>
// //         <Modal.Body>
// //           <p>Thank you for booking with us. Your room was booked successfull!</p>
// //         </Modal.Body>
// //         <Modal.Footer><FaCheckCircle /></Modal.Footer>
// //       </Modal.Dialog>
// //     </div>
// //   );
// // }

// // export default StaticExample;

// import React, { useState } from 'react';
// import { FaCheckCircle } from "react-icons/fa";
// import Modal from 'react-bootstrap/Modal';

// function BookModals({show, handleClose}) {
//   return (
//       <Modal show={show} onHide={handleClose}>
//         <Modal.Header closeButton>
//           <Modal.Title style={{width: "600px"}} className='text-p'>Welcome to The Richmonde Hotel & Suites</Modal.Title>
//         </Modal.Header>
//         <Modal.Body className='text-p'>Thank you for booking with us. Your room was booked successfull!</Modal.Body>
//         <Modal.Footer><FaCheckCircle /></Modal.Footer>
//       </Modal>
//   );
// }

// export default BookModals;

// import { useState } from 'react';
// import Modal from 'react-bootstrap/Modal';
// import { FaCheckCircle } from "react-icons/fa";

// const initialData = {
// 	// role: "GUEST",
// 	email: "",
// };

// function BookModals({ show, handleClose }) {
//   const [emailSent, setEmailSent] = useState(false);
//   const [formData, setFormData] = useState(initialData);

//   const email = "";

//   const handleSendEmail = () => {
//     // Code to send email goes here
//     <a href={`mailto:${formData.email}`}>Email Us</a>
//     setEmailSent(true);
//   }

//   return (
//     <Modal show={show} onHide={handleClose}>
//       <Modal.Header closeButton>
//         <Modal.Title style={{ width: "600px" }} className='text-p'>Welcome to The Richmonde Hotel & Suites</Modal.Title>
//       </Modal.Header>
//       <Modal.Body className='text-p'>
//         {emailSent ? 'Your booking details have been sent to your email.' : 'Thank you for booking with us. Your room was booked successfully!'}
//       </Modal.Body>
//       <Modal.Footer>
//         {!emailSent && <button onClick={handleSendEmail}>Send email</button>}
//         <FaCheckCircle />
//       </Modal.Footer>
//     </Modal>
//   );
// }

// export default BookModals;

import React, { useState } from 'react';
import { FaCheckCircle } from "react-icons/fa";
import Modal from 'react-bootstrap/Modal';

function BookModals({show, handleClose}) {
  const [email, setEmail] = useState('');

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    window.location.href = `mailto:${email}`;
  }

  return (
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title style={{width: "600px"}} className='text-p'>Welcome to The Richmonde Hotel & Suites</Modal.Title>
        </Modal.Header>
        <Modal.Body className='text-p'>
          Thank you for booking with us. Your room was booked successfully! 
          Please provide your email address if you would like to receive a confirmation email.
          <form onSubmit={handleSubmit}>
            <input type="email" value={email} onChange={handleEmailChange} placeholder="Enter email" />
            <button type="submit">Send</button>
          </form>
        </Modal.Body>
        <Modal.Footer><FaCheckCircle /></Modal.Footer>
      </Modal>
  );
}

export default BookModals;

