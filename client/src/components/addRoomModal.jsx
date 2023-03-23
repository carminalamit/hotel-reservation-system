import { Modal, Form, Button, Dropdown } from "react-bootstrap";
import { useState } from "react";
import { app } from "../../lib/axios-config";
import TimePicker from 'react-time-picker';

const initialData = {
  room_no: "",
  room_type: "",
  rate: "",
  details: "",
  max_guests: "",
  image: "",
  checkin_time: "",
  checkout_time: "",
};

export function AddRoomModal({ show, onHide }) {
  // Edit data booking
  const [roomDetails, setRoomDetails] = useState(initialData);
  const [value, onChange] = useState('00:00');
  console.log(roomDetails);

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("room_no", roomDetails.room_no);
    formData.append("room_type", roomDetails.room_type);
    formData.append("rate", roomDetails.rate);
    formData.append("details", roomDetails.details);
    formData.append("max_guests", roomDetails.max_guests);
    formData.append("image", roomDetails.image);
    formData.append("checkin_time", roomDetails.checkin_time);
    formData.append("checkout_time", roomDetails.checkout_time);

    const res = await app.post("/api/rooms", formData);
    alert("Added successfully!");
    window.location.reload();
    onHide();
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];

    // send the formData object to the server
    setRoomDetails({
      ...roomDetails,
      image: file,
    });
  };
  console.log(roomDetails);

  //   useEffect(() => {
  //     roomDetailChange(selectedRoomData);
  //     console.log(selectedRoomData);
  //   }, [selectedRoomData]);

  return (
    <Modal className="modal-font" show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Add Room</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput4">
            <Form.Label>Room no.</Form.Label>
            <Form.Control
              className="border-dark"
              name="room_no"
              type="number"
              value={roomDetails.room_no}
              onChange={(e) =>
                setRoomDetails({
                  ...roomDetails,
                  room_no: e.target.value,
                })
              }
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput4">
            <Form.Label>Room Type</Form.Label>
            <Form.Control
              className="border-dark"
              name="room_type"
              type="text"
              value={roomDetails.room_type}
              onChange={(e) =>
                setRoomDetails({
                  ...roomDetails,
                  room_type: e.target.value,
                })
              }
              required
            />
            {/* <Dropdown name="room_type"
              type="text"
              value={roomDetails.room_type}
              onChange={(e) =>
                setRoomDetails({
                  ...roomDetails,
                  room_type: e.target.value,
                })
              }
              required>
              <Dropdown.Toggle
                variant="success"
                id="dropdown-basic"
                className="bg-white text-black border-dark"
                style={{ width: "465px", textAlign: "start" }}
                required
              >
                {roomDetails.room_type || "Select Room Type"}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item>Deluxe Single Room</Dropdown.Item>
                <Dropdown.Item>Deluxe Single Room</Dropdown.Item>
                <Dropdown.Item>Double Room</Dropdown.Item>
                <Dropdown.Item>Deluxe Double Room</Dropdown.Item>
                <Dropdown.Item>Twin Room</Dropdown.Item>
                <Dropdown.Item>Deluxe Twin Room</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown> */}
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput4">
            <Form.Label>Rate</Form.Label>
            <Form.Control
              className="border-dark"
              name="rate"
              type="text"
              value={roomDetails.rate}
              onChange={(e) =>
                setRoomDetails({
                  ...roomDetails,
                  rate: e.target.value,
                })
              }
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput4">
            <Form.Label>Details</Form.Label>
            <Form.Control
              className="border-dark"
              as="textarea"
              name="details"
              type="text"
              value={roomDetails.details}
              onChange={(e) =>
                setRoomDetails({
                  ...roomDetails,
                  details: e.target.value,
                })
              }
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput4">
            <Form.Label>Maximum guests</Form.Label>
            <Form.Control
              className="border-dark"
              name="max_guests"
              type="text"
              value={roomDetails.max_guests}
              onChange={(e) =>
                setRoomDetails({
                  ...roomDetails,
                  max_guests: e.target.value,
                })
              }
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput4">
            <Form.Label>Image</Form.Label>
            <Form.Control
              className="border-dark"
              name="image"
              type="file"
              // value={roomDetails.images}
              onChange={handleImageUpload}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput4">
            <Form.Label>Checkin Time</Form.Label>
            {/* <Form.Control
              className="border-dark"
              name="checkin_time"
              type="text"
              value={roomDetails.checkin_time}
              onChange={(e) =>
                setRoomDetails({
                  ...roomDetails,
                  checkin_time: e.target.value,
                })
              }
              required
            /> */}
            <div><TimePicker className="border-dark"
              name="checkin_time"
              type="text"
              value={roomDetails.checkin_time}
              onChange={(e) =>
                setRoomDetails({
                  ...roomDetails,
                  checkin_time: e.target.value,
                })
              } 
              /></div>
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput4">
            <Form.Label>Checkout Time</Form.Label>
            <Form.Control
              className="border-dark"
              name="checkout_time"
              type="text"
              value={roomDetails.checkout_time}
              onChange={(e) =>
                setRoomDetails({
                  ...roomDetails,
                  checkout_time: e.target.value,
                })
              }
              required
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button
          className="bg-black text-white"
          variant="custom"
          onClick={handleSubmit}
        >
          Add
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
