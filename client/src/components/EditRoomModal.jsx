import { Modal, Form, Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import { app } from "../../lib/axios-config";

const initialData = {
  room_id: "",
  type: "",
  rate: "",
  details: "",
  max_count: "",
  status: "",
  img_url: "",
  max_count: "",
  checkin_time: "",
  checkout_time: "",
};

export function EditRoomModal({ show, onHide, selectedRoomData }) {
  // Edit data booking
  const [roomDetail, roomDetailChange] = useState({});

  const handleSubmit = async () => {
    const res = await app.put(`/api/room/${roomDetail.room_id}`, roomDetail);
    alert("Updated successfully!");
    window.location.reload();
    onHide();
  };

  useEffect(() => {
    roomDetailChange(selectedRoomData);
    console.log(selectedRoomData);
  }, [selectedRoomData]);

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
            <Form.Label>Room Id</Form.Label>
            <Form.Control
              className="border-dark"
              name="room_id"
              type="integer"
              value={roomDetail.room_id}
              onChange={(e) =>
                roomDetailChange({
                  ...roomDetail,
                  room_id: e.target.value,
                })
              }
              disabled
            />
          </Form.Group>
          <Form.Group
            className="mb-3 was-validated"
            controlId="exampleForm.ControlInput4"
          >
            <Form.Label>Type</Form.Label>
            <Form.Control
              className="border-dark"
              name="type"
              type="text"
              value={roomDetail.type}
              onChange={(e) =>
                roomDetailChange({
                  ...roomDetail,
                  type: e.target.value,
                })
              }
              required
            />
          </Form.Group>
          <Form.Group
            className="mb-3 was-validated"
            controlId="exampleForm.ControlInput4"
          >
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
          <Form.Group
            className="mb-3 was-validated"
            controlId="exampleForm.ControlInput4"
          >
            <Form.Label>Details</Form.Label>
            <Form.Control
              className="border-dark"
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
          <Form.Group
            className="mb-3 was-validated"
            controlId="exampleForm.ControlInput4"
          >
            <Form.Label>Maximun guests</Form.Label>
            <Form.Control
              className="border-dark"
              name="max_count"
              type="text"
              value={roomDetail.max_count}
              onChange={(e) =>
                roomDetailChange({
                  ...roomDetail,
                  max_count: e.target.value,
                })
              }
              required
            />
          </Form.Group>
          <Form.Group
            className="mb-3 was-validated"
            controlId="exampleForm.ControlInput4"
          >
            <Form.Label>Img url</Form.Label>
            <Form.Control
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
            />
          </Form.Group>
          <Form.Group
            className="mb-3 was-validated"
            controlId="exampleForm.ControlInput4"
          >
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
          <Form.Group
            className="mb-3 was-validated"
            controlId="exampleForm.ControlInput4"
          >
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
