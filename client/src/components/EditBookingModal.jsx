import { Modal, Form, Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import { app } from "../../lib/axios-config";

const initialData = {
  booking_id: "",
  user_id: "",
  room_id: "",
  check_in: "",
  check_out: "",
};

export function EditBookingModal({ show, onHide, selectedBookingData }) {
  // Edit data booking
  const [bookingDetail, bookingDetailChange] = useState({});
  
  // const [bookingData, setBookingData] = useState(selectedBookingData);
  // const handleOnChange = (event) => {
  //   setBookingData({ ...bookingData, [event.target.name]: event.target.value });
  // };

  const handleSubmit = async () => {
    const res = await app.put(`/api/bookings/${bookingDetail.id}`, bookingDetail);
    alert("Updated successfully!");
    window.location.reload();
    onHide();
  };

  useEffect(() => {
    bookingDetailChange(selectedBookingData)
    console.log(selectedBookingData)
  }, [selectedBookingData])

  console.log(bookingDetail)
  return (
    <Modal className="modal-font" show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Edit details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form className="needs-validation">
          <Form.Group
            className="mb-3 was-validated"
            controlId="exampleForm.ControlInput2"
          >
            <Form.Label>Booking Id</Form.Label>
            <Form.Control
              className="border-dark"
              name="id"
              type="integer"
              // placeholder="input name"
              value={bookingDetail.id}
              onChange={(e) =>
                bookingDetailChange({
                  ...bookingDetail,
                  id: e.target.value,
                })
              }
              // autoComplete="name"
              disabled
            />
            {/* <div className="invalid-feedback">Please enter your name</div> */}
          </Form.Group>
          <Form.Group
            className="mb-3 was-validated"
            controlId="exampleForm.ControlInput3"
          >
            <Form.Label>User Id</Form.Label>
            <Form.Control
              className="border-dark"
              name="user_id"
              type="integer"
              // placeholder="09*********"
              value={bookingDetail.user_id}
              onChange={(e) =>
                bookingDetailChange({
                  ...bookingDetail,
                  user_id: e.target.value,
                })
              }
              // autoComplete="number"
              disabled
            />
            {/* <div className="invalid-feedback">Please enter your number</div> */}
          </Form.Group>
          <Form.Group
            className="mb-3 was-validated"
            controlId="exampleForm.ControlInput4"
          >
            <Form.Label>Room Id</Form.Label>
            <Form.Control
              className="border-dark"
              name="room_id"
              type="integer"
              // placeholder="email@gmail.com"
              value={bookingDetail.room_id}
              onChange={(e) =>
                bookingDetailChange({
                  ...bookingDetail,
                  room_id: e.target.value,
                })
              }
              // autoComplete="email"
              disabled
            />
            {/* <div className="invalid-feedback">Check in</div> */}
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
            <Form.Label>Check in</Form.Label>
            <Form.Control
              style={{ width: "200px" }}
              value={bookingDetail.check_in?.split("T")[0]}
              className="border-dark"
              name="check_in"
              type="date"
              onChange={(e) =>
                bookingDetailChange({
                  ...bookingDetail,
                  check_in: e.target.value,
                })
              }
              // autoComplete="name"
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
            <Form.Label>Check out</Form.Label>
            <Form.Control
              style={{ width: "200px" }}
              value={bookingDetail.check_out?.split("T")[0]}
              className="border-dark"
              name="check_out"
              type="date"
              onChange={(e) =>
                bookingDetailChange({
                  ...bookingDetail,
                  check_out: e.target.value,
                })
              }
              // autoComplete="name"
              required
            />
          </Form.Group>
          {/* <Form.Group
            className="mb-3 was-validated"
            controlId="exampleForm.ControlInput5"
          >
            <Form.Label>Password</Form.Label>
            <Form.Control
              className="border-dark"
              name="password"
              type="password"
              value={bookingDetail.password}
              onChange={handleOnChange}
              autoComplete="password"
              required
            />
            <div className="invalid-feedback">Please enter your password</div>
          </Form.Group>
          <Form.Group
            className="mb-3 was-validated"
            controlId="exampleForm.ControlInput6"
          >
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              className="border-dark"
              name="confirmPassword"
              type="password"
              value={bookingDetail.confirmPassword}
              onChange={handleOnChange}
              autoComplete="confirmpassword"
              required
            />
            <div className="invalid-feedback">Please confirm password</div>
          </Form.Group> */}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        {/* <Button variant="secondary" onClick={handleClose2}>
            Close
          </Button> */}
        <Button
          className="bg-black text-white"
          variant="custom"
          onClick={handleSubmit}
          // onSubmit={onHide}
        >
          Update changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
