import React from "react";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
// import { DatePicker } from "antd";
// import moment from "moment";
// const { RangePicker } = DatePicker;
import { app } from "../../lib/axios-config";

function Room() {
  const navigate = useNavigate();

  const [roomData, setRoomData] = useState([]);

  const getRoom = async () => {
    const res = await app.get("/api/room");
    console.log(res);
    setRoomData(res.data.room);
  };
  console.log(roomData);

  useEffect(() => {
    getRoom();
  }, []);

  return (
    // <section id="room" className="block room-block">
    <Container fluid>
      <div className="services title-holder text-center m-4">
        <h2>Find your next stay</h2>
        <h6>Search low prices on rooms</h6>
      </div>
      {roomData.map((data) => (
        // <Card className="bs column justify-content-center mt-5">
        //   <div className="col-md-9">
        //     <Card.Img className="room-img" variant="top" src={data.img_url} />
        //   </div>
        //   <div>
        //     <Card.Body className="details-fs col-md-7">
        //       <Card.Title>{data.type}</Card.Title>
        //       <Card.Text>{data.rate} per night</Card.Text>
        //       <Card.Text>{data.details}</Card.Text>
        //       <Card.Text>Max no. of guest: {data.max_count}</Card.Text>
        //       <Card.Text>{data.status}</Card.Text>
        //       <Card.Text>Check in{data.checkin_time}</Card.Text>
        //       <Card.Text>Check out{data.checkout_time}</Card.Text>
        //       <Button variant="primary">Reserve now</Button>
        //     </Card.Body><
        //   </div>
        // </Card>

        // <Card className="bs mt-4 w-50" onClick={()=> {navigate(`/room/${data.room_id}` )
        //   console.log('click')}}>
        //   <div className="row justify-content-center mt-2 mb-2">
        //     <div className="col-md-4">
        //       <img src={data.img_url} className="room-img" />
        //     </div>
        //     <div className="details-fs col-md-7">
        //       <Card.Title>{data.type}</Card.Title>
        //       <Card.Text>{data.rate} per night</Card.Text>
        // {/* <Card.Text>{data.details}</Card.Text> */}
        // {/* <Card.Text>Max no. of guest: {data.max_count}</Card.Text> */}
        // {/* <Card.Text>{data.status}</Card.Text> */}
        // {/* <Card.Text>Check in: {data.checkin_time}</Card.Text> */}
        // {/* <Card.Text>Check out: {data.checkout_time}</Card.Text> */}
        // {/* <Button variant="primary">Reserve now</Button> */}
        //     </div>
        //   </div>
        // </Card>

        <Card
          className="details-fs container mt-3 mb-3 p-2"
          style={{ width: '36rem' }}
          onClick={() => {
            navigate(`/room/${data.room_id}`);
            console.log("click");
          }}
        >
          <div className="row">
            <Card.Img src={data.img_url} />
          </div>
          <Card.Body>
            <Card.Title>{data.type}</Card.Title>
            <Card.Text>{data.rate}</Card.Text>
          </Card.Body>
        </Card>
      ))}
    </Container>
    // </section>
  );
}

export default Room;
