import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { app } from "../../lib/axios-config";
import { convertImageData } from "../util";

function Room() {
  const navigate = useNavigate();

  const [roomData, setRoomData] = useState([]);

  
  const getRoom = async () => {
    const res = await app.get("/api/rooms");
    console.log(res);
    setRoomData(res.data.rooms);
  };
  console.log(roomData);

  useEffect(() => {
    getRoom();
  }, []);

  return (
    <Container fluid>
      <div className="text-center mt-3 mb-2 home-text">
        <h1>Find your next stay</h1>
        <h5>Search best rates on rooms</h5>
      </div>
      <div className="d-flex image-position">
        {roomData.map((data) => (
          <Row key={data.id} style={{ padding: "25px" }}>
            <Card
              className="container mt-3 mb-3 p-2"
              style={{ width: "25rem", height: "380px" }} //20 rem
              onClick={() => {
                navigate(`/room/${data.id}`);
                console.log("click");
              }}
            >
              <div className="d-block row">
                <Card.Img
                  style={{ height: "310px" }}
                  src={convertImageData(data.image_data)}
                />
                <div className="card-img-overlay"></div>
              </div>
              <Card.Body className="d-flex justify-content-between">
                <Card.Title className="room-title">{data.room_type}</Card.Title>
                <Card.Text  className="room-price">{data.rate}/day</Card.Text>
              </Card.Body>
            </Card>
          </Row>
        ))}
      </div>
    </Container>
  );
}

export default Room;
