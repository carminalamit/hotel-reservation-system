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

  // rooms data
  const [roomData, roomDataChange] = useState([]);
  const [selectedRoomData, setSelectedRoomData] = useState({});
  const [showEditRoom, setShowEditRoom] = useState(false);
  const [showAddRoom, setShowAddRoom] = useState(false);
  const [showViewImage, setShowViewImage] = useState(false)
  const [selectedImage, setSelectedImage] = useState(null);
  console.log(selectedRoomData);

  // bookings data
  const [bookingData, bookingDataChange] = useState([]);
  const [selectedBookingData, setSelectedBookingData] = useState({});
  const [showEditBooking, setShowEditBooking] = useState(false);
  console.log(selectedBookingData);

  // users data
  const [usersData, usersDataChange] = useState([]);
  const [selectedUsersData, setSelectedUsersData] = useState({});

  // update booking data
  const editButton = (id) => {
    fetchBooking(id);
    setShowEditBooking(true);
    console.log(id);
  };

  const fetchBooking = async (id) => {
    try {
      const { data } = await app.get(
        `http://localhost:3000/api/bookings/${id}`
      );
      setSelectedBookingData(data.bookings);
      console.log(data.bookings);
    } catch (err) {
      console.log(err.message);
    }
  };


  // Update room data
  const editRoomButton = (id) => {
    fetchRoom(id);
    setShowEditRoom(true);
    console.log(id);
  };

  const fetchRoom = async (id) => {
    try {
      const { data } = await app.get(
        `http://localhost:3000/api/rooms/${id}`
      );
      
      // const base64 = Buffer.from(data.image_data, 'binary').toString('base64');

      setSelectedRoomData(data.rooms);
      console.log(data.rooms);
    } catch (err) {
      console.log(err.message);
    }
  };

  // Get data room
  const fetchDataRoom = async () => {
    try {
      const { data } = await app.get("http://localhost:3000/api/rooms");
      console.log(data)
      roomDataChange(data.rooms.sort((old, item) => old.id - item.id));
      console.log(data.rooms);
      console.log("---------------------------------------")
    } catch (err) {
      console.log(err.message);
    }
  };

  // Delete data room
  const deleteRoom = async (id) => {
    if (window.confirm("Do you want to remove?")) {
      try {
        const res = await app.delete(
          `http://localhost:3000/api/rooms/${id}`
        );

        alert("Removed successfully!");
        window.location.reload();
      } catch (err) {
        if (err.message==="Request failed with status code 500") {
          alert("Room has booked dates. Unable to delete!")
        }
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
      const { data } = await app.get("http://localhost:3000/api/bookings");
      bookingDataChange(
        data.bookings.sort((old, item) => old.id - item.id)
      );
      console.log(data.bookings);
    } catch (err) {
      console.log(err.message);
    }
  };

  // Delete data booking
  const deleteBooking = async (id) => {
    if (window.confirm("Do you want to remove?")) {
      try {
        const res = await app.delete(
          `http://localhost:3000/api/bookings/${id}`
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
        data.users.sort((old, item) => old.id - item.id)
      );
      console.log(data.users);
    } catch (err) {
      console.log(err.message);
    }
  };

  // Delete data users
  const deleteUsers = async (id) => {
    if (window.confirm("Do you want to remove?")) {
      try {
        const res = await app.delete(
          `http://localhost:3000/api/users/${id}`
        );

        alert("Removed successfully!");
        window.location.reload();
      } catch (err) {
        console.log(err.message);
      }
    }
  };

  useEffect(() => {
    const verify = async () => {
      try {
        const res = await app.post('/api/auth/verify');
        console.log(res)
      } catch (error) {
        window.location.href="/"
      }
    }
    verify()
  }, [])

  useEffect(() => {
    fetchDataRoom();
    fetchDataBooking();
    fetchDataUsers();
    
  }, []);

  console.log(showViewImage)
  console.log(roomData)
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
              eventKey="bookings"
              title="Bookings"
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
                    <th>Booking Date/Time</th>
                    <th>Updated Booking Date/Time</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {bookingData &&
                    bookingData.map((item) => (
                      <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>{item.user_id}</td>
                        <td>{item.room_id}</td>
                        <td>{moment(item.check_in).format("LL")}</td>
                        <td>{moment(item.check_out).format("LL")}</td>
                        <td>{moment(item.inserted_at).format("LLL")}</td>
                        <td>{moment(item.updated_at).format("LLL")}</td>
                        <td>
                          <Button
                            className="bg-black text-white mx-2"
                            variant="custom"
                            onClick={() => {
                              editButton(item.id);
                            }}
                          >
                            Edit
                          </Button>
                          <Button
                            className="bg-black text-white"
                            variant="custom"
                            onClick={() => {
                              deleteBooking(item.id);
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
                      <th>Room No.</th>
                      <th>Room Type</th>
                      <th>Rate</th>
                      <th>Details</th>
                      <th>Maximum Guests</th>
                      <th>Checkin Time</th>
                      <th>Checkout Time</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {roomData &&
                      roomData.map((item) => (
                        <tr key={item.id}>
                          <td>{item.id}</td>
                          <td>{item.room_no}</td>
                          <td style={{ minWidth: "120px" }}>{item.room_type}</td>
                          <td style={{ minWidth: "140px" }}>{item.rate}</td>
                          <td style={{ minWidth: "600px" }}>{item.details}</td>
                          <td style={{ minWidth: "120px" }}>{item.max_guests}
                          </td>

                          {/* <td>{item.img_url}</td> */}
                          <td>{item.checkin_time}</td>
                          <td>{item.checkout_time}</td>
                          <td style={{ minWidth: "282px" }}>
                            <Button
                              className="bg-black text-white mx-2"
                              variant="custom"
                              onClick={() => {
                                editRoomButton(item.id);
                              }}
                            >
                              Edit
                            </Button>
                            <Button
                              className="bg-black text-white"
                              variant="custom"
                              onClick={() => {
                                deleteRoom(item.id);
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
                      <tr key={item.id}>
                        <td>{item.id}</td>
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
