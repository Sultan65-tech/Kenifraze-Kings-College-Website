import React, { useRef, useState, useEffect } from "react";
import "../styles/add-food.style.css";
import useContact from "../store/useContact";

const AddContact = () => {
	const [formData, setFormData] = useState({
		openTime: "",
		address: "",
		phone: "",
		email: "",
		mapUrl: ""
	});

	const { submitContact, fetchContact, contact, isFetching, isSubmit } =
		useContact();

	const [errors, setErrors] = useState({});
	const msgRef = useRef(null);

	useEffect(() => {
		fetchContact();
	}, []);

	useEffect(() => {
		if (!isFetching && contact) {
			setFormData({
				openTime: contact.openTime || "",
				address: contact.address || "",
				phone: contact.phone || "",
				email: contact.email || "",
				mapUrl: contact.mapUrl || ""
			});
		}
	}, [contact, isFetching]);

	const handleChange = e => {
		const { name, value } = e.target;

		setFormData(prev => ({
			...prev,
			[name]: value
		}));

		if (errors[name]) {
			setErrors(prev => ({
				...prev,
				[name]: ""
			}));
		}
	};

	const validate = () => {
		const newErrors = {};

		// Open Time
		if (!formData.openTime.trim()) {
			newErrors.openTime = "Open time is required";
		} else if (formData.openTime.trim().length < 5) {
			newErrors.openTime = "Enter a valid opening time";
		}

		// Address
		if (!formData.address.trim()) {
			newErrors.address = "Address is required";
		} else if (formData.address.trim().length < 10) {
			newErrors.address = "Address must contain at least 10 characters";
		} else if (formData.address.trim().length > 500) {
			newErrors.address = "Address cannot exceed 500 characters";
		}

		// Phone
		if (!formData.phone.trim()) {
			newErrors.phone = "Contact number is required";
		} else if (!/^[0-9+\-\s()]{7,20}$/.test(formData.phone.trim())) {
			newErrors.phone = "Enter a valid contact number";
		}

		// Email
		if (!formData.email.trim()) {
			newErrors.email = "Email address is required";
		} else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
			newErrors.email = "Enter a valid email address";
		}

		// Map URL
		if (!formData.mapUrl.trim()) {
			newErrors.mapUrl = "Map URL is required";
		} else {
			try {
				new URL(formData.mapUrl.trim());
			} catch {
				newErrors.mapUrl = "Enter a valid URL";
			}
		}

		setErrors(newErrors);

		return Object.keys(newErrors).length === 0;
	};

	const showMsg = (msg, success) => {
		if (!msgRef.current) return;

		msgRef.current.className = success
			? "success-message"
			: "error-message";

		msgRef.current.textContent = msg;

		window.scrollTo({
			top: 0,
			behavior: "smooth"
		});

		setTimeout(() => {
			if (msgRef.current) {
				msgRef.current.className = "";
				msgRef.current.textContent = "";
			}
		}, 2000);
	};

	const handleSubmit = async e => {
		e.preventDefault();

		if (!validate()) {
			showMsg("Please fix all validation errors.", false);
			return;
		}

		await submitContact(formData, showMsg);
	};

	const resetForm = () => {
		if (contact) {
			setFormData({
				openTime: contact.openTime || "",
				address: contact.address || "",
				phone: contact.phone || "",
				email: contact.email || "",
				mapUrl: contact.mapUrl || ""
			});
		} else {
			setFormData({
				openTime: "",
				address: "",
				phone: "",
				email: "",
				mapUrl: ""
			});
		}

		setErrors({});
	};

	return (
		<div className="main-content">
			<div id="addm--food" className="container">
				<div className="form-container">
					<div className="form-header">
						<h2>Edit Contact Section</h2>
						<p ref={msgRef}></p>
					</div>

					<div className="form-body">
						<form onSubmit={handleSubmit}>
							<div className="form-group">
								<label>Open Times</label>
								<input
									type="text"
									name="openTime"
									value={formData.openTime}
									onChange={handleChange}
									placeholder={
										isFetching
											? "Loading..."
											: "8:00AM - 8:00PM"
									}
								/>
								{errors.openTime && (
									<small className="field-error">
										{errors.openTime}
									</small>
								)}
							</div>

							<div className="form-group">
								<label>Address</label>
								<input
									type="text"
									name="address"
									value={formData.address}
									onChange={handleChange}
									placeholder={
										isFetching
											? "Loading..."
											: "Washington DC, New York City"
									}
								/>
								{errors.address && (
									<small className="field-error">
										{errors.address}
									</small>
								)}
							</div>

							<div className="form-group">
								<label>Contact Number</label>
								<input
									type="text"
									name="phone"
									value={formData.phone}
									onChange={handleChange}
									placeholder={
										isFetching
											? "Loading..."
											: "+88013******"
									}
								/>
								{errors.phone && (
									<small className="field-error">
										{errors.phone}
									</small>
								)}
							</div>

							<div className="form-group">
								<label>Email</label>
								<input
									type="email"
									name="email"
									value={formData.email}
									onChange={handleChange}
									placeholder={
										isFetching
											? "Loading..."
											: "contact@example.com"
									}
								/>
								{errors.email && (
									<small className="field-error">
										{errors.email}
									</small>
								)}
							</div>

							<div className="form-group">
								<label>Map URL</label>
								<input
									type="text"
									name="mapUrl"
									value={formData.mapUrl}
									onChange={handleChange}
									placeholder={
										isFetching
											? "Loading..."
											: "https://maps.google.com/..."
									}
								/>
								{errors.mapUrl && (
									<small className="field-error">
										{errors.mapUrl}
									</small>
								)}
							</div>

							<div className="actions">
								<button
									type="button"
									className="btn btn-reset"
									onClick={resetForm}
									disabled={isSubmit}
								>
									Reset
								</button>

								<button
									type="submit"
									className="btn btn-submit"
									disabled={isSubmit}
								>
									{isSubmit ? (
										<>
											<div className="spinner"></div>
											Processing...
										</>
									) : (
										"Save Changes"
									)}
								</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
};

export default AddContact;
