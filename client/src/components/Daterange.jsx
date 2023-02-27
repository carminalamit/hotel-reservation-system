import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { app } from "../../lib/axios-config";
import { useParams, useNavigate } from "react-router-dom";
import BookModal from "../components/BookModals";
import BookModals from "../components/BookModals";

function Daterange() {
  const { id } = useParams();
  const [checkIn, setCheckIn] = useState(null);
  const [checkOut, setCheckOut] = useState(null);
  const [roomId, setRoomId] = useState(null);

  const [openModal, setOpenModal] = useState(false);

  const navigate = useNavigate()

  // const getDate = async () => {
  //   const res = await app.get("/api/booking");
  //   console.log(res);
  //   setDates(res.data.booking);
  // };
  // console.log(dates);

  // const handleSubmit = async () => {
  //   if (dates) return;
  //   const res = await app.post("/api/booking", dates);
  //   // onHide();
  //   console.log(res);
  // };

  const handleSubmit = async () => {
    const dates = { check_in: checkIn, check_out: checkOut, room_id: id };
    try {
      if (!checkIn || !checkOut) return;
      const res = await app.post("/api/booking", dates);
      setOpenModal(true)
    } catch (error) {navigation('/')}
  };

  const handleClose = () => {
    setOpenModal(false);
  };

  // useEffect(() => {
  //   getDate();
  // }, []);

  return (
    <div className="date">
      <div className="" style={{ width: "250px" }}>
        <BookModals show={openModal} handleClose={handleClose} />
        <div className="details-fs" style={{ margin: 20 }}>
          <h6>Available dates</h6>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
              <Form.Label>Check in</Form.Label>
              <Form.Control
                style={{ width: "200px" }}
                value={checkIn}
                className="border-dark"
                name="checkin"
                type="date"
                // value={formData.phoneNumber}
                onChange={(event) => setCheckIn(event.target.value)}
                autoComplete="name"
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
              <Form.Label>Check out</Form.Label>
              <Form.Control
                style={{ width: "200px" }}
                value={checkOut}
                className="border-dark"
                name="checkout"
                type="date"
                // value={formData.phoneNumber}
                onChange={(event) => setCheckOut(event.target.value)}
                autoComplete="number"
                required
              />
            </Form.Group>
          </Form>
          <Button
            className="bg-black text-white"
            variant="custom"
            onClick={handleSubmit}
          >
            Reserve now
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Daterange;
