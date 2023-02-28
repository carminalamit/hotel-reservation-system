import React from "react";
import { Form, Button } from "react-bootstrap";
import { useState } from "react";
import { app } from "../../lib/axios-config";
import { useNavigate } from "react-router-dom";

const initialData = {
  email: "",
  password: "",
};

function AdminLogin() {
  const [formData, setFormData] = useState(initialData);
  const navigate = useNavigate();
  const handleOnChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data } = await app.post("/api/auth/login", formData);
    const { accessToken } = data;

    localStorage.setItem("authenticateToken", accessToken);
    app.defaults.headers.common["Authorization"] = "Bearer " + accessToken;

    // onHide();
    navigate("/admin/panel");
  };

  return (
    <div className="wrapper bg-dark d-flex align-items-center justify-content-center w-100">
      <div className="login">
        <Form className="needs-validation" onSubmit={handleSubmit}>
          <h3 className="mb-3 modal-font">
            Login
          </h3>
          <Form.Group className="form-group was-validated mb-2 modal-font">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              className="border-dark"
              type="email"
              placeholder="name@example.com"
              name="email"
              value={formData.email}
              onChange={handleOnChange}
              autoComplete="off"
              required
            />
            <div className="invalid-feedback">Please enter your email</div>
          </Form.Group>
          <Form.Group className="form-group was-validated mb-2 modal-font">
            <Form.Label>Password</Form.Label>
            <Form.Control
              className="border-dark"
              type="password"
              autoComplete="password"
              name="password"
              value={formData.password}
              onChange={handleOnChange}
              required
            />
            <div className="invalid-feedback">Please enter your password</div>
          </Form.Group>
          <Form.Group className="modal-font">
            <Button
              className="w-100 mt-2 bg-black text-white"
              variant="custom"
              onClick={handleSubmit}
            >
              Submit
            </Button>
          </Form.Group>
        </Form>
      </div>
    </div>
  );
}

export default AdminLogin;
