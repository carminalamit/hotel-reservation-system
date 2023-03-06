import { Modal, Form, Button } from "react-bootstrap";
import { useState } from 'react';
import { app } from '../../lib/axios-config';


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
		// const { name, value } = e.target
		// let regex
		
		// if (name === "phoneNumber") {
		// 	const regex = /(09|\+639)\d{9}$/; // the regex pattern for phone numbers starting with 09 and with a total of 11 digits
		// 	console.log(regex.test(value))
		// 	if (!regex.test(value)) {
		// 		console.log(value)
		// 	  // display an error message for invalid phone numbers
		// 	  e.target.setCustomValidity("Please enter a valid phone number");
		// 	} else {
		// 	  e.target.setCustomValidity(""); // clear the error message
		// 	}

		//   }

		setFormData({ ...formData, [e.target.name]: e.target.value });

		
		if (formData.phoneNumber.length <= 11) {
			setFormData(formData.phoneNumber)
		} 
		
		
	}
	const handleSubmit = async () => {
		if (formData.password !== formData.confirmPassword) return;

		try {
			const res = await app.post('/api/users', formData)
			onHide();
		} catch (error) {
			// Show an error message to the user
			console.log(error);
			alert("An error occurred. Please try again later.");
		}
		
	}
	console.log(formData)

	return (
		<Modal className="modal-font" show={show} onHide={onHide}>
			<Modal.Header closeButton>
				<Modal.Title>Register</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Form className="needs-validation">
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
					<Form.Group className="mb-3" controlId="exampleForm.ControlInput6">
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

