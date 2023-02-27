import { Modal, Form, Button } from "react-bootstrap";
import { useState } from 'react';
import { app } from '../../lib/axios-config'

const initialData = {
	role: "GUEST",
	name: "",
	phoneNumber: "",
	email: "",
	password: "",
	confirmPassword: "",
};

export function RegisterModal({ show, onHide }) {
	const [formData, setFormData] = useState(initialData);
	const handleOnChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	}
	const handleSubmit = async () => {
		if (formData.password !== formData.confirmPassword) return;
		const res = await app.post('/api/users', formData)
		onHide();
	}
	console.log(formData)

	return (
		<Modal className="modal-font" show={show} onHide={onHide}>
			<Modal.Header closeButton>
				<Modal.Title>Register</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Form className="needs-validation">
					<Form.Group className="mb-3 was-validated" controlId="exampleForm.ControlInput2">
						<Form.Label>Name</Form.Label>
						<Form.Control
							className="border-dark"
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
					<Form.Group className="mb-3 was-validated" controlId="exampleForm.ControlInput3">
						<Form.Label>Phone Number</Form.Label>
						<Form.Control
							className="border-dark"
							name="phoneNumber"
							type="integer"
							placeholder="09*********"
							value={formData.phoneNumber}
							onChange={handleOnChange}
							autoComplete="number"
							required
						/>
						<div className="invalid-feedback">Please enter your number</div>
					</Form.Group>
					<Form.Group className="mb-3 was-validated" controlId="exampleForm.ControlInput4">
						<Form.Label>Email</Form.Label>
						<Form.Control
							className="border-dark"
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
					<Form.Group className="mb-3 was-validated" controlId="exampleForm.ControlInput5">
						<Form.Label>Password</Form.Label>
						<Form.Control
							className="border-dark"
							name="password"
							type="password"
							value={formData.password}
							onChange={handleOnChange}
							autoComplete="password"
							required
						/>
						<div className="invalid-feedback">Please enter your password</div>
					</Form.Group>
					<Form.Group className="mb-3 was-validated" controlId="exampleForm.ControlInput6">
						<Form.Label>Confirm Password</Form.Label>
						<Form.Control
							className="border-dark"
							name="confirmPassword"
							type="password"
							value={formData.confirmPassword}
							onChange={handleOnChange}
							autoComplete="confirmpassword"
							required
						/>
						<div className="invalid-feedback">Please confirm password</div>
					</Form.Group>
				</Form>
			</Modal.Body>
			<Modal.Footer>
				{/* <Button variant="secondary" onClick={handleClose2}>
            Close
          </Button> */}
				<Button
					className="bg-black text-white"
					variant="custom"
					onClick={handleSubmit}
					// onSubmit={onHide}
		  		>
					Submit
				</Button>
			</Modal.Footer>
		</Modal>
	)
}

