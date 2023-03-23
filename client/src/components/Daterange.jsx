import { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import { app } from "../../lib/axios-config";
import { useParams } from "react-router-dom";
import BookModal from "./BookModal";
import DatePicker from "react-datepicker";
import { subDays } from "date-fns";
import moment from "moment";
import "react-datepicker/dist/react-datepicker.css";

function Daterange() {
  // To subtract days from a date
  const newDate = subDays(new Date(), 5); // subtract 5 days from today's date
  console.log(newDate);

  const [excludedDate, setExcludedDate] = useState([]);

  const onChangeCheckIn = (date) => {
    setCheckIn(date);
  };

  const onChangeCheckOut = (date) => {
    setCheckOut(date);
  };

  const { id } = useParams();
  const [checkIn, setCheckIn] = useState(null);
  const [checkOut, setCheckOut] = useState(null);
  console.log(checkIn, checkOut);
  const [roomId, setRoomId] = useState(null);

  const [openModal, setOpenModal] = useState(false);

  // const navigate = useNavigate()

  const handleSubmit = async () => {
    const dates = { check_in: checkIn, check_out: checkOut, room_id: id };
    try {
      if (!checkIn || !checkOut) return;
      const res = await app.post("/api/bookings", dates);
      setOpenModal(true);
    } catch (error) {}
  };

  const handleClose = () => {
    setOpenModal(false);
    window.location.reload();
  };

  const getBookingByRoomId = async () => {
    try {
      const res = await app.get(`/api/bookings/room-id/${id}`);
      console.log(res);
      const bookings = res.data?.bookings;
      const data = bookings.map((booking) => {
        console.log(new Date(booking.check_in));
        return {
          start: new Date(booking.check_in),
          end: new Date(booking.check_out),
        };
      });
      setExcludedDate(data);
      console.log(data);
    } catch (error) {}
  };

  useEffect(() => {
    getBookingByRoomId();
  }, []);

  return (
    <div className="date">
      <div>
        <BookModal show={openModal} handleClose={handleClose} />
        <div className="details-fs text-center mt-2">
          <h6
            style={{ fontSize: "17px", fontWeight: "bold", paddingTop: "15px" }}
          >
            See availability
          </h6>
          <Form className="" style={{ marginTop: "25px" }}>
            <Form.Group className="" controlId="exampleForm.ControlInput2">
              <div className="">
                <div>
                  {/* <Form.Group className="date-input">
                    <Form.Control
                      
                      type="email"
                      placeholder="name@example.com"
                      name="email"
                      autoComplete="email"
                      required
                    />
                    <div className="invalid-feedback">
                      Please enter your email
                    </div>
                  </Form.Group> */}
                  <DatePicker
                    className="date-input"
                    placeholderText="Check in"
                    selected={checkIn}
                    onChange={onChangeCheckIn}
                    minDate={moment().toDate()}
                    excludeDateIntervals={excludedDate}
                    // selectsRange
                  />
                  {/* <Form.Label>Check out</Form.Label> */}
                  <DatePicker
                    className="date-input"
                    placeholderText="Check out"
                    selected={checkOut}
                    onChange={onChangeCheckOut}
                    minDate={moment().toDate()}
                    excludeDateIntervals={excludedDate}
                    // selectsRange
                  />
                </div>
              </div>
            </Form.Group>
          </Form>
          <Button
            style={{ width: "80%" }}
            className="bg-black text-white"
            variant="custom"
            onClick={() => {
              handleSubmit();
            }}
          >
            Book now
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Daterange;
