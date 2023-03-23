import { Modal, Form, Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import { app } from "../../lib/axios-config";

const initialData = {
  room_no: "",
  room_id: "",
  room_type: "",
  rate: "",
  details: "",
  max_guests: "",
  image: "",
  checkin_time: "",
  checkout_time: "",
};

export function EditRoomModal({ show, onHide, selectedRoomData }) {
  console.log(selectedRoomData);
  // Edit data booking
  const [roomDetail, roomDetailChange] = useState(initialData);

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("room_no", roomDetail.room_no);
    formData.append("room_type", roomDetail.room_type);
    formData.append("rate", roomDetail.rate);
    formData.append("details", roomDetail.details);
    formData.append("max_guests", roomDetail.max_guests);
    formData.append("image", roomDetail.image);
    formData.append("checkin_time", roomDetail.checkin_time);
    formData.append("checkout_time", roomDetail.checkout_time);

    console.log(formData, roomDetail);
    const res = await app.put(`/api/rooms/${roomDetail.room_id}`, formData);
    alert("Updated successfully!");
    window.location.reload();
    onHide();
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];

    // send the formData object to the server
    roomDetailChange({
      ...roomDetail,
      image: file,
    });
  };

  useEffect(() => {
    roomDetailChange(selectedRoomData);
    console.log(selectedRoomData);
  }, [selectedRoomData]);

  console.log(roomDetail);

  return (
    <Modal className="modal-font" show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Edit details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          {/* <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
            <Form.Label>Room Id</Form.Label>
            <Form.Control
              className="border-dark"
              name="room_id"
              type="integer"
              value={roomDetail.id}
              onChange={(e) =>
                roomDetailChange({
                  ...roomDetail,
                  room_id: e.target.value,
                })
              }
              disabled
            />
          </Form.Group> */}
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
            <Form.Label>Room No.</Form.Label>
            <Form.Control
              className="border-dark"
              name="room_no"
              type="text"
              value={roomDetail.room_no}
              onChange={(e) =>
                roomDetailChange({
                  ...roomDetail,
                  room_no: e.target.value,
                })
              }
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput4">
            <Form.Label>Type</Form.Label>
            <Form.Control
              className="border-dark"
              name="room_type"
              type="text"
              value={roomDetail.room_type}
              onChange={(e) =>
                roomDetailChange({
                  ...roomDetail,
                  room_type: e.target.value,
                })
              }
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput4">
            <Form.Label>Rate</Form.Label>
            <Form.Control
              className="border-dark"
              name="rate"
              type="text"
              value={roomDetail.rate}
              onChange={(e) =>
                roomDetailChange({
                  ...roomDetail,
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
              value={roomDetail.details}
              onChange={(e) =>
                roomDetailChange({
                  ...roomDetail,
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
              value={roomDetail.max_guests}
              onChange={(e) =>
                roomDetailChange({
                  ...roomDetail,
                  max_guests: e.target.value,
                })
              }
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput4">
            <Form.Label>Image</Form.Label>
            {/* <Form.Control
              className="border-dark"
              name="img_url"
              type="text"
              value={roomDetail.img_url}
              onChange={(e) =>
                roomDetailChange({
                  ...roomDetail,
                  img_url: e.target.value,
                })
              }
              required
            /> */}
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
            <Form.Control
              className="border-dark"
              name="checkin_time"
              type="text"
              value={roomDetail.checkin_time}
              onChange={(e) =>
                roomDetailChange({
                  ...roomDetail,
                  checkin_time: e.target.value,
                })
              }
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput4">
            <Form.Label>Checkout Time</Form.Label>
            <Form.Control
              className="border-dark"
              name="checkout_time"
              type="text"
              value={roomDetail.checkout_time}
              onChange={(e) =>
                roomDetailChange({
                  ...roomDetail,
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
          Update changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
