import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { app } from "../../lib/axios-config";
import Daterange from "../components/Daterange";
import Logout from "../components/Logout";
import { convertImageData } from "../util";


function Room() {
  const { id } = useParams();
  const [room, setRoom] = useState(null);

  useEffect(() => {
    const getRoomData = async () => {
      try {
        const res = await app.get(`/api/room/${id}`);
        console.log(res);
        setRoom(res.data?.room);
      } catch (error) {
        console.error(error);
      }
    };

    getRoomData();
  }, [id]);

  console.log(room);

  return (
    <div>
      <Logout />
      {room && (
        <>
          <div className="cont">
            <div>
              <img className="room-img" src={convertImageData(room.image_data)} />
            </div>
            <div style={{display: "flex", marginLeft: "26px"}}>
              <div className="room-text">
                <h4 className="room-title2">{room.type}</h4>
                <p>{room.rate}</p>
                <p>Max number of guests: {room.max_count}</p>
                <p>Check in: {room.checkin_time}</p>
                <p>Check out: {room.checkout_time}</p>
                <p>{room.details}</p>
              </div>
              <div style={{margin: "35px 29px"}} className="date-position">
                <Daterange />
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Room;
