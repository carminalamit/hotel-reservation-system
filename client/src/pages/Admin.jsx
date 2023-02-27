import React, { useEffect, useState } from "react";
import Logout from "../components/Logout";
import { Table, Tab, Tabs, Button } from "react-bootstrap";
import { app } from '../../lib/axios-config';

function Admin() {
  // room data declaration
  const [roomData, roomDataChange] = useState([]);
  const roomDataArray = Object.values(roomData);

  // booking data declaration
  const [bookingData, bookingDataChange] = useState([]);
  const bookingDataArray = Object.values(bookingData);

  // users data declaration
  const [usersData, usersDataChange] = useState([]);
  const usersDataArray = Object.values(usersData);

  // Get data room
  const fetchDataRoom = async () => {
    try {
      const { data } = await app.get("http://localhost:3000/api/room");
      roomDataChange(data.room);
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
        )

        alert("Removed successfully!")
        window.location.reload()
      } catch (err) {
        console.log(err.message)
      }
    }
  }


  // Get data booking
  const fetchDataBooking = async () => {
    try {
      const { data } = await app.get("http://localhost:3000/api/booking");
      bookingDataChange(data.booking);
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
        )

        alert("Removed successfully!")
        window.location.reload()
      } catch (err) {
        console.log(err.message)
      }
    }
  }


  // Get data users
  const fetchDataUsers = async () => {
    try {
      const { data } = await app.get("http://localhost:3000/api/users");
      usersDataChange(data.users);
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
        )

        alert("Removed successfully!")
        window.location.reload()
      } catch (err) {
        console.log(err.message)
      }
    }
  }


  useEffect(() => {
    fetchDataRoom();
    fetchDataBooking();
    fetchDataUsers();
  }, []);

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
                  {bookingDataArray &&
                    bookingDataArray.map((item) => (
                      <tr key={item.booking_id}>
                        <td>{item.booking_id}</td>
                        <td>{item.user_id}</td>
                        <td>{item.room_id}</td>
                        <td>{item.check_in}</td>
                        <td>{item.check_out}</td>
                        <td>
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
                              deleteBooking(item.booking_id)
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
            >
              <Table striped bordered hover variant="dark">
                <thead>
                  <tr>
                    <th>Room Id</th>
                    <th>Type</th>
                    <th>Rate</th>
                    <th>Details</th>
                    <th>Max count</th>
                    <th>Img url</th>
                    <th>Checkin time</th>
                    <th>Checkout time</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {roomDataArray &&
                    roomDataArray.map((item) => (
                      <tr key={item.room_id}>
                        <td>{item.room_id}</td>
                        <td>{item.type}</td>
                        <td>{item.rate}</td>
                        <td>{item.details}</td>
                        <td>{item.max_count}</td>

                        <td>{item.img_url}</td>
                        <td>{item.checkin_time}</td>
                        <td>{item.checkout_time}</td>
                        <td>
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
                              deleteRoom(item.room_id)
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
              eventKey="users"
              title="Users"
              tabClassName="text-light bg-dark"
            >
              <Table striped bordered hover variant="dark">
                <thead>
                  <tr>
                    <th>User Id</th>
                    <th>Role</th>
                    <th>Name</th>
                    <th>Phone</th>
                    <th>Email</th>
                    <th>Password</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {usersDataArray &&
                    usersDataArray.map((item) => (
                      <tr key={item.user_id}>
                        <td>{item.user_id}</td>
                        <td>{item.role}</td>
                        <td>{item.name}</td>
                        <td>{item.phone}</td>
                        <td>{item.email}</td>
                        <td>{item.password}</td>
                        <td>
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
                        </td>
                      </tr>
                    ))}
                </tbody>
              </Table>
            </Tab>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

export default Admin;
