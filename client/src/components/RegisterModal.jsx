import { Modal, Form, Button } from "react-bootstrap";
import { useState } from "react";
import { app } from "../../lib/axios-config";

const initialData = {
  name: "",
  phoneNumber: "",
  email: "",
  password: "",
  confirmPassword: "",
};

export function RegisterModal({ show, onHide }) {
  const [formData, setFormData] = useState(initialData);
  const [validated, setValidated] = useState(false);
  // const [isError, setIsError] = useState("");

  const handleOnChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (event) => {
    // event.preventDefault()
    setValidated(true);
    if (
      !formData.name ||
      !formData.phoneNumber ||
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword
    )
      return;
    if (formData.password !== formData.confirmPassword) {
      alert("Password do not match");
      return;
    }
    try {
      const res = await app.post("/api/users", formData);
      onHide();
    } catch (error) {
      // Show an error message to the user
      console.log(error);
      alert("An error occurred. Please try again later.");
    }
  };
  console.log(formData);

  return (
    <Modal className="modal-font" show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Register</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form
          noValidate
          validated={validated}
          onSubmit={handleSubmit}
          className="needs-validation"
        >
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
            <Form.Label>Name</Form.Label>
            <Form.Control
              className="was-validated border-dark"
              name="name"
              type="text"
              placeholder="input name"
              value={formData.name}
              onChange={handleOnChange}
              autoComplete="name"
              required
            />
            <div className="invalid-feedback">Please enter your name</div>
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
            <Form.Label>Phone Number</Form.Label>
            <Form.Control
              className="was-validated border-dark"
              maxLength={11}
              name="phoneNumber"
              type="number"
              // type="tel"
              placeholder="09*********"
              value={formData.phoneNumber}
              onChange={handleOnChange}
              // autoComplete="number"
              autoComplete="number"
              required
            />
            <div className="invalid-feedback">Please enter your number</div>
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput4">
            <Form.Label>Email</Form.Label>
            <Form.Control
              className="was-validated border-dark"
              name="email"
              type="email"
              placeholder="email@gmail.com"
              value={formData.email}
              onChange={handleOnChange}
              autoComplete="email"
              required
            />
            <div className="invalid-feedback">Please enter your email</div>
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput5">
            <Form.Label>Password</Form.Label>
            <Form.Control
              className="was-validated border-dark"
              name="password"
              type="password"
              placeholder="*********"
              value={formData.password}
              onChange={handleOnChange}
              autoComplete="password"
              required
            />
            <div className="invalid-feedback">Please enter your password</div>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              className="was-validated border-dark"
              name="confirmPassword"
              type="password"
              placeholder="*********"
              value={formData.confirmPassword}
              onChange={handleOnChange}
              autoComplete="confirmpassword"
              required
            />
            <div className="invalid-feedback">Password do not match</div>
          </Form.Group>
          {/* <ValidatedInput
            type="password"
            name="password"
            label="Password"
            validate="required,isLength:6:60"
            errorHelp={{
              required: "Please specify a password",
              isLength: "Password must be at least 6 characters"
          }}
          />
          <ValidatedInput
            type="password"
            name="confirmPassword"
            label="Confirm Password"
            // Validate can be a function as well
            validate={(val, context) => val === context.password}
            // If errorHelp property is a string, then it is used
            // for all possible validation errors
            errorHelp="Passwords do not match"
          /> */}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        {/* <Button variant="secondary" onClick={handleClose2}>
            Close
          </Button> */}
        <Button
          className="bg-black text-white"
          //   type="submit"
          variant="custom"
          onClick={handleSubmit}
          // onSubmit={onHide}
        >
          Submit
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
