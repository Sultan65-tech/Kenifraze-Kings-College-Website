import React, { useRef, useState, useEffect } from "react";
import "../styles/add-food.style.css";
import useArtist from "../store/useArtist";


const AddArtist = () => {
	const { subMitArtist, isSubmit } =
		useArtist();
	const [privacy, setPrivacy] = useState("");
	const [image, setImage] = useState(null);
	const [preview, setPreview] = useState(null);
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [phone, setPhone] = useState("");
	const [errors, setErrors] = useState({});
	const msgRef = useRef(null);

	const validate = () => {
		const newErrors = {};
		if (!image) {
			showMsg("Teacher image required", false);
			return false;
		} else if (!name || name === "") {
			showMsg("Teacher name required", false);
			return false;
		} else if (!email || email === "") {
			showMsg("Teacher email required", false);
			return false;
		} else if (!phone) {
			showMsg("Teacher phone required", false);
			return false;
		} else if (!privacy.trim()) {
			showMsg("Bio data is required", false);
			return false;
		} else if (privacy.trim().length < 50) {
			showMsg("Bio must contain at least 50 characters", false);
			return false;
		} else if (privacy.length > 200) {
			showMsg("Bio data cannot exceed 200 characters", false);
			return false;
		}
		return true;
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

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!validate()) return;

	await	subMitArtist({
			name,
			email,
			phone,
			bio_data: privacy.trim()
		},image,showMsg);
		
		setName("")
		setEmail("")
		setPhone("")
		setPrivacy("")
		setImage(null)
		setPreview(null)
	};

	

	return (
		<div className="main-content">
			<div id="addm--food" className="container">
				<div className="form-container">
					<div className="form-header">
						<h2>Add A Teacher</h2>
						<p ref={msgRef}></p>
					</div>

					<div className="form-body">
						<form onSubmit={handleSubmit}>
							<div className="form-group">
								<label>Select Teacher Image</label>
								{preview &&
								<img
									style={{
										objectFit: "cover",
										width: "100%",
										height: "230px",
										borderRadius: "5px",
										margin: ".5rem auto"
									}}
									src={preview}
									alt="Artist image"
								/>
								}
								<input
									onChange={e => {
										if (!e.target?.files[0]) return;
										setImage(e.target.files[0]);
										setPreview(
											URL.createObjectURL(
												e.target.files[0]
											)
										);
									}}
									type="file"
									accept="image/*"
								/>
							</div>
							<div className="form-group">
								<label>Enter Teacher Name</label>
								<input
									type="text"
									name="name"
									placeholder="Enter teachers name"
									onChange={e => setName(e.target.value)}
									value={name}
								/>
							</div>
							<div className="form-group">
								<label>Teacher Contact Number</label>
								<input
									type="tel"
									name="tel"
									placeholder="Enter teachers number"
									onChange={e => setPhone(e.target.value)}
									value={phone}
								/>
							</div>
							<div className="form-group">
								<label>Teacher Email Address</label>
								<input
									type="email"
									name="email"
									placeholder="Enter teachers email"
									onChange={e => setEmail(e.target.value)}
									value={email}
								/>
							</div>
							<div className="form-group">
								<label>
									Write Bio Data About Teacher
									<span style={{ color: "#ef4444" }}>*</span>
								</label>
								<textarea
									rows="8"
									placeholder="Write About artist..."
									value={privacy}
									onChange={e => {
										setPrivacy(e.target.value);
										if (errors.privacy) {
											setErrors(prev => ({
												...prev,
												privacy: ""
											}));
										}
									}}
								/>
								<div
									style={{
										display: "flex",
										justifyContent: "space-between",
										marginTop: "5px"
									}}
								>
									<small>
										{privacy.length}/200 characters
									</small>
								</div>
								{errors.privacy && (
									<p
										style={{
											color: "#ef4444",
											fontSize: "14px",
											marginTop: "5px"
										}}
									>
										{errors.privacy}
									</p>
								)}
							</div>

							<div className="actions">
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
										"Add Now"
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

export default AddArtist;
