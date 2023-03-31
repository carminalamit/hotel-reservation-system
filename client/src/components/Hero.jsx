import React, { useState } from "react";
import Carousel from "react-bootstrap/Carousel";

function UncontrolledExample() {
  return (
    <Carousel>
      <Carousel.Item className="hero">
        <img
          className="d-block w-100 h-100"
          src="./src/assets/room1.jpg"
          alt="First slide"
        />
        <Carousel.Caption
          style={{ background: "linear-gradient(45deg, black, transparent" }}
        >
          <h3 className="text-s">Featured Rooms</h3>
          <h4 className="text-s">The Richmonde Luxury Room</h4>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item className="hero">
        <img
          className="d-block w-100 h-100"
          src="./src/assets/room-2.jpg"
          alt="Second slide"
        />

        <Carousel.Caption
          style={{ background: "linear-gradient(45deg, black, transparent" }}
        >
          <h3 className="text-s">Featured Rooms</h3>
          <h4 className="text-s">The Richmonde Family Room</h4>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item className="hero">
        <img
          className="d-block w-100 h-100"
          src="./src/assets/room2.jpg"
          alt="Third slide"
        />
        <Carousel.Caption
          style={{ background: "linear-gradient(45deg, black, transparent" }}
        >
          <h3 className="text-s">Featured Rooms</h3>
          <h4 className="text-s">The Richmonde De Luxe Room</h4>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item className="hero">
        <img
          className="d-block w-100 h-100"
          src="./src/assets/pool.jpg"
          alt="Fourth slide"
        />
        <Carousel.Caption
          style={{ background: "linear-gradient(45deg, black, transparent" }}
        >
          <h3 className="text-s">The Richmonde Hotel</h3>
          <h4 className="text-s">Infinity Pool</h4>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item className="hero">
        <img
          className="d-block w-100 h-100"
          src="./src/assets/lobby.jpg"
          alt="Fifth slide"
        />
        <Carousel.Caption
          style={{ background: "linear-gradient(45deg, black, transparent" }}
        >
          <h3 className="text-s">The Richmonde Hotel</h3>
          <h4 className="text-s">Lobby</h4>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default UncontrolledExample;
