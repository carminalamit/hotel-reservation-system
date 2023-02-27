// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { app } from "../../lib/axios-config";
// import Daterange from "../components/Daterange"

// function Room() {
//   const { id } = useParams();
//   const [room, setRoom] = useState(null)
//   const getRoomData = async () => {
//     const res = await app.get(`/api/room/${id}`);
//     console.log(res);
//     setRoom(res.data?.room[0])
//   };

//   console.log(room)

//   useEffect(() => {getRoomData()}, []);
//   return (
//     <div>
//       <h1>Room</h1>
//       {room.img_url}
//       {room.details}
//       {room.details}
//       <Daterange />
//     </div>
//   );
// }

// export default Room;

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { app } from "../../lib/axios-config";
import Daterange from "../components/Daterange";

function Room() {
  const { id } = useParams();
  const [room, setRoom] = useState(null);

  useEffect(() => {
    const getRoomData = async () => {
      try {
        const res = await app.get(`/api/room/${id}`);
        console.log(res);
        setRoom(res.data?.room[0]);
      } catch (error) {
        console.error(error);
      }
    };

    getRoomData();
  }, [id]);

  console.log(room);

  return (
    <div className="">
      {room && (
        <>
          <div>
            <div>
              <img className="room-img" src={room.img_url} />
            </div>
            <div className="cont">
              <div className="room-text">
                <h4>{room.type}</h4>
                <p>{room.rate}</p>
                <p>Max number of guests: {room.max_count}</p>
                <p>Check in: {room.checkin_time}</p>
                <p>Check out: {room.checkout_time}</p>
                <p>{room.details}</p>
              </div>
              <div>
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
