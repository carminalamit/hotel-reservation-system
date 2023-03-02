import { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import { app } from "../../lib/axios-config";
import { useParams } from "react-router-dom";
import BookModal from "../components/BookModals";
import BookModals from "../components/BookModals";
import DatePicker from "react-datepicker";
import { subDays, addDays, format } from 'date-fns';
import "react-datepicker/dist/react-datepicker.css";

function Daterange() {
  

  // To subtract days from a date
  const newDate = subDays(new Date(), 5); // subtract 5 days from today's date
  console.log(newDate)

  // To add days to a date
  const newDate2 = addDays(new Date(), 5); // add 5 days to today's date

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(null);
  const [excludedDate, setExcludedDate] = useState([])

  const onChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };

  const { id } = useParams();
  const [checkIn, setCheckIn] = useState(null);
  const [checkOut, setCheckOut] = useState(null);
  const [roomId, setRoomId] = useState(null);

  const [openModal, setOpenModal] = useState(false);

  // const navigate = useNavigate()

  const handleSubmit = async () => {
    const dates = { check_in: checkIn, check_out: checkOut, room_id: id };
    try {
      if (!checkIn || !checkOut) return;
      const res = await app.post("/api/booking", dates);
      setOpenModal(true);
    } catch (error) {}
  };

  const handleClose = () => {
    setOpenModal(false);
  };


  const getBookingByRoomId = async () => {
    try {
      const res = await app.get(`/api/booking/room-id/${id}`)
      console.log(res)
      const bookings = res.data?.booking
      const data = bookings.map(booking => {
        console.log(new Date(booking.check_in))
        return {start:new Date(booking.check_in), end:new Date(booking.check_out)}
      })
      setExcludedDate(data)
      console.log(data)
    } catch (error) {
      
    }
  }


  useEffect(() => {
    getBookingByRoomId()
  }, []);


  return (
    <div className="date">
      <div className="" style={{ width: "250px" }}>
        <BookModals show={openModal} handleClose={handleClose} />
        <div className="details-fs" style={{ margin: 20 }}>
          <h6>Available dates</h6>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
              <Form.Label>Check in</Form.Label>
              {/* <Form.Control
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
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput3"> */}
              {/* <Form.Label>Check out</Form.Label> */}
              {/* <Form.Control
                style={{ width: "200px" }}
                value={checkOut}
                className="border-dark"
                name="checkout"
                type="date"
                // value={formData.phoneNumber}
                onChange={(event) => setCheckOut(event.target.value)}
                autoComplete="number"
                required
              /> */}
              <DatePicker
                selected={startDate}
                // value={checkIn}
                onChange={onChange}
                excludeDateIntervals = {excludedDate}
                selectsRange
              />
              <Form.Label>Check out</Form.Label>
              <DatePicker
                selected={endDate}
                // value={checkOut}
                onChange={onChange}
                excludeDateIntervals = {excludedDate}
                selectsRange
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
