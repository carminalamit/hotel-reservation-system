import { Modal, Form, Button } from "react-bootstrap";
import { useState } from 'react';
import { app } from '../../lib/axios-config';
import { useNavigate } from "react-router-dom";

const initialData = {
	email: '',
	password: '',
}


export function LoginModal({ show, onHide }) {
	const [formData, setFormData] = useState(initialData);
	const navigate = useNavigate()
	const handleOnChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	}
	const handleSubmit = async (e) => {
		e.preventDefault()
		const { data } = await app.post('/api/auth/login', formData)
		const { accessToken } = data
		console.log(data)

		localStorage.setItem('authenticateToken', accessToken)
		app.defaults.headers.common['Authorization'] = 'Bearer ' + accessToken
		
		onHide();
		navigate('/home')
		
	}

	return (
		<Modal className="modal-font" show={show} onHide={onHide}>
			<Modal.Header closeButton>
				<Modal.Title>Login</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Form className="needs-validation" onSubmit={handleSubmit}>
					<Form.Group className="mb-3">
						<Form.Label>Email address</Form.Label>
						<Form.Control
							className="was-validated border-dark"
							type="email"
							placeholder="name@example.com"
							name="email"
							value={formData.email}
							onChange={handleOnChange}
							autoComplete="email"
							required
						/>
						<div className="invalid-feedback">Please enter your email</div>
					</Form.Group>
					<Form.Group className="mb-3">
						<Form.Label>Password</Form.Label>
						<Form.Control
							className="was-validated border-dark"
							type="password"
							placeholder="*********"
							name="password"
							value={formData.password}
							onChange={handleOnChange}
							autoComplete="current password"
							required
						/>
						<div className="invalid-feedback">Please enter your password</div>
					</Form.Group>
				</Form>
			</Modal.Body>
			<Modal.Footer>
				<Button className="bg-black text-white" variant="custom" onClick={handleSubmit}>
					Submit
				</Button>
			</Modal.Footer>
		</Modal>
		
	)
	
}