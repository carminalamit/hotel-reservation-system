import React, { useEffect, useState } from "react";
import Logout from "../components/Logout";
import { Table, Tab, Tabs, Button } from "react-bootstrap";
import { app } from "../../lib/axios-config";
import { EditBookingModal } from "../components/EditBookingModal";
import { EditRoomModal } from "../components/EditRoomModal";
import { AddRoomModal } from "../components/AddRoomModal";
import moment from "moment";
import ViewImageModal from "../components/ViewImageModal";
import { convertImageData } from "../util";

function Admin() {
  const [show, setShow] = useState(false);
  const toggleShow = () => setShow(!show);

  // room data declaration
  const [roomData, roomDataChange] = useState([]);
  const [selectedRoomData, setSelectedRoomData] = useState({});
  const [showEditRoom, setShowEditRoom] = useState(false);
  const [showAddRoom, setShowAddRoom] = useState(false);
  const [showViewImage, setShowViewImage] = useState(false)
  const [selectedImage, setSelectedImage] = useState(null);
  console.log(selectedRoomData);

  // booking data declaration
  const [bookingData, bookingDataChange] = useState([]);
  const [selectedBookingData, setSelectedBookingData] = useState({});
  const [showEditBooking, setShowEditBooking] = useState(false);
  console.log(selectedBookingData);

  // users data declaration
  const [usersData, usersDataChange] = useState([]);
  const [selectedUsersData, setSelectedUsersData] = useState({});

  // update booking data
  const editButton = (booking_id) => {
    fetchBooking(booking_id);
    setShowEditBooking(true);
    console.log(booking_id);
  };

  const fetchBooking = async (booking_id) => {
    try {
      const { data } = await app.get(
        `http://localhost:3000/api/booking/${booking_id}`
      );
      setSelectedBookingData(data.booking);
      console.log(data.booking);
    } catch (err) {
      console.log(err.message);
    }
  };

  // Add room data
  // const addRoomButton = (room_id) => {
  //   addRoom()
  //   setShowEditRoom(true)
  //   console.log(room_id)
  // }

  // const addRoom = async (room_id) => {
  //   try {
  //     const { data } = await app.post(
  //       `http://localhost:3000/api/room`
  //     );
  //     setSelectedRoomData(data.room)
  //     console.log(data.room)
  //   } catch (err) {
  //     console.log(err.message);
  //   }

  // };

  // Update room data
  const editRoomButton = (room_id) => {
    fetchRoom(room_id);
    setShowEditRoom(true);
    console.log(room_id);
  };

  const fetchRoom = async (room_id) => {
    try {
      const { data } = await app.get(
        `http://localhost:3000/api/room/${room_id}`
      );
      
      // const base64 = Buffer.from(data.image_data, 'binary').toString('base64');

      setSelectedRoomData(data.room);
      console.log(data.room);
    } catch (err) {
      console.log(err.message);
    }
  };

  // Get data room
  const fetchDataRoom = async () => {
    try {
      const { data } = await app.get("http://localhost:3000/api/room");
      roomDataChange(data.room.sort((old, item) => old.room_id - item.room_id));
      console.log(data.room);
    } catch (err) {
      console.log(err.message);
    }
  };

  // Delete data room
  const deleteRoom = async (room_id) => {
    if (window.confirm("Do you want to remove?")) {
      try {
        const res = await app.delete(
          `http://localhost:3000/api/room/${room_id}`
        );

        alert("Removed successfully!");
        window.location.reload();
      } catch (err) {
        console.log(err.message);
      }
    }
  };

  // view image
  const handleImage = (data) => {
    const image = convertImageData(data.image_data)
    setSelectedImage(image)
    setShowViewImage(true)
    console.log(data)
  }

  // Get data booking
  const fetchDataBooking = async () => {
    try {
      const { data } = await app.get("http://localhost:3000/api/booking");
      bookingDataChange(
        data.booking.sort((old, item) => old.booking_id - item.booking_id)
      );
      console.log(data.booking);
    } catch (err) {
      console.log(err.message);
    }
  };

  // Delete data booking
  const deleteBooking = async (booking_id) => {
    if (window.confirm("Do you want to remove?")) {
      try {
        const res = await app.delete(
          `http://localhost:3000/api/booking/${booking_id}`
        );

        alert("Removed successfully!");
        window.location.reload();
      } catch (err) {
        console.log(err.message);
      }
    }
  };

  // Get data users
  const fetchDataUsers = async () => {
    try {
      const { data } = await app.get("http://localhost:3000/api/users");
      usersDataChange(
        data.users.sort((old, item) => old.user_id - item.user_id)
      );
      console.log(data.users);
    } catch (err) {
      console.log(err.message);
    }
  };

  // Delete data users
  const deleteUsers = async (user_id) => {
    if (window.confirm("Do you want to remove?")) {
      try {
        const res = await app.delete(
          `http://localhost:3000/api/users/${user_id}`
        );

        alert("Removed successfully!");
        window.location.reload();
      } catch (err) {
        console.log(err.message);
      }
    }
  };

  useEffect(() => {
    fetchDataRoom();
    fetchDataBooking();
    fetchDataUsers();
    
  }, []);

  console.log(showViewImage)
  return (
    <div>
      <Logout />
      <div className="admin-font">
        <h1 className="text-center mt-3 mb-3" style={{ fontSize: "25px" }}>
          <b>Admin Panel</b>
        </h1>
        <div className="m-3">
          <Tabs
            // defaultActiveKey="profile"
            // id="uncontrolled-tab-example"
            striped
            bordered
            hover
            variant="dark"
          >
            <Tab
              eventKey="booking"
              title="Booking"
              tabClassName="text-light bg-dark"
            >
              <Table striped bordered hover variant="dark">
                <thead>
                  <tr>
                    <th>Booking Id</th>
                    <th>User Id</th>
                    <th>Room Id</th>
                    <th>Check In</th>
                    <th>Check Out</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {bookingData &&
                    bookingData.map((item) => (
                      <tr key={item.booking_id}>
                        <td>{item.booking_id}</td>
                        <td>{item.user_id}</td>
                        <td>{item.room_id}</td>
                        <td>{moment(item.check_in).format("LL")}</td>
                        <td>{moment(item.check_out).format("LL")}</td>
                        <td>
                          {/* <Button
                            className="bg-black text-white"
                            variant="custom"
                            onClick={setShowAddBooking}
                          >
                            Add
                          </Button> */}
                          <Button
                            className="bg-black text-white mx-2"
                            variant="custom"
                            onClick={() => {
                              editButton(item.booking_id);
                            }}
                          >
                            Edit
                          </Button>
                          <Button
                            className="bg-black text-white"
                            variant="custom"
                            onClick={() => {
                              deleteBooking(item.booking_id);
                            }}
                          >
                            Delete
                          </Button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </Table>
            </Tab>
            <Tab
              eventKey="rooms"
              title="Rooms"
              tabClassName="text-light bg-dark"
              onClick={toggleShow}
            >
              <button
                style={{ margin: "-86px 2px", position: "absolute" }}
                className="btn btn-dark"
                onClick={() => setShowAddRoom(true)}
              >
                Add Room
              </button>
              <div style={{ maxWidth: "98vw", overflow: "auto" }}>
                <Table striped bordered hover variant="dark">
                  <thead>
                    <tr>
                      <th>Room Id</th>
                      <th>Type</th>
                      <th>Rate</th>
                      <th>Details</th>
                      <th>Max count</th>
                      {/* <th>Image</th> */}
                      <th>Checkin time</th>
                      <th>Checkout time</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {roomData &&
                      roomData.map((item) => (
                        <tr key={item.room_id}>
                          <td>{item.room_id}</td>
                          <td style={{ minWidth: "120px" }}>{item.type}</td>
                          <td style={{ minWidth: "140px" }}>{item.rate}</td>
                          <td style={{ minWidth: "600px" }}>{item.details}</td>
                          <td style={{ minWidth: "120px" }}>
                            {item.max_count}
                          </td>

                          {/* <td>{item.img_url}</td> */}
                          <td>{item.checkin_time}</td>
                          <td>{item.checkout_time}</td>
                          <td style={{ minWidth: "282px" }}>
                            <Button
                              className="bg-black text-white mx-2"
                              variant="custom"
                              onClick={() => {
                                editRoomButton(item.room_id);
                              }}
                            >
                              Edit
                            </Button>
                            <Button
                              className="bg-black text-white"
                              variant="custom"
                              onClick={() => {
                                deleteRoom(item.room_id);
                              }}
                            >
                              Delete
                            </Button>
                            <Button
                              className="bg-black text-white mx-2"
                              variant="custom"
                              onClick={() => {
                                handleImage(item)
                              }}
                            >
                              View image
                            </Button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </Table>
              </div>
            </Tab>
            <Tab
              eventKey="users"
              title="Users"
              tabClassName="text-light bg-dark"
            >
              <Table striped bordered hover variant="dark">
                <thead>
                  <tr>
                    <th>User Id</th>
                    {/* <th>Role</th> */}
                    <th>Name</th>
                    <th>Phone</th>
                    <th>Email</th>
                    {/* <th>Password</th> */}
                    {/* <th>Action</th> */}
                  </tr>
                </thead>
                <tbody>
                  {usersData &&
                    usersData.map((item) => (
                      <tr key={item.user_id}>
                        <td>{item.user_id}</td>
                        {/* <td>{item.role}</td> */}
                        <td>{item.name}</td>
                        <td>{item.phone}</td>
                        <td>{item.email}</td>
                        {/* <td>{item.password}</td> */}
                        {/* <td>
                          <Button
                            className="bg-black text-white"
                            variant="custom"
                          >
                            Add
                          </Button>
                          <Button
                            className="bg-black text-white mx-2"
                            variant="custom"
                          >
                            Edit
                          </Button>
                          <Button
                            className="bg-black text-white"
                            variant="custom"
                            onClick={() => {
                              deleteUsers(item.user_id)
                            }}
                          >
                            Delete
                          </Button>
                        </td> */}
                      </tr>
                    ))}
                </tbody>
              </Table>
            </Tab>
          </Tabs>
        </div>
      </div>
      <EditBookingModal
        show={showEditBooking}
        selectedBookingData={selectedBookingData}
        onHide={() => setShowEditBooking(false)}
      />
      <EditRoomModal
        show={showEditRoom}
        selectedRoomData={selectedRoomData}
        onHide={() => setShowEditRoom(false)}
      />
      <AddRoomModal show={showAddRoom} onHide={() => setShowAddRoom(false)} />
      <ViewImageModal show={showViewImage} handleClose={() => setShowViewImage(false)} imageData={selectedImage} />
    </div>
  );
}

export default Admin;
