import React, { useRef, useState, useEffect } from "react";
import { useSearchParams, Navigate, useNavigate } from "react-router-dom";
import "../styles/add-food.style.css";
import useArtist from "../store/useArtist";
import api from "../libs/api";

const EditArtist = () => {
	const { editArtist, isSubmit, selectedArtist } = useArtist();
	const [privacy, setPrivacy] = useState("");
	const [image, setImage] = useState(null);
	const [preview, setPreview] = useState(null);
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [phone, setPhone] = useState("");
	const [errors, setErrors] = useState({});
	const msgRef = useRef(null);
	const navigate = useNavigate();
	const [searchParams] = useSearchParams();
	const id = searchParams.get("id");

	const validate = () => {
		const newErrors = {};
		if (!preview) {
			showMsg("Artist image required", false);
			return false;
		} else if (!name || name === "") {
			showMsg("Artist name required", false);
			return false;
		} else if (!email || email === "") {
			showMsg("Artist email required", false);
			return false;
		} else if (!phone) {
			showMsg("Artist phone required", false);
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

	const handleSubmit = async e => {
		e.preventDefault();
		if (!validate()) return;

		await editArtist(
			{
				name,
				email,
				phone,
				bio_data: privacy.trim(),
				isNewImage: image ? true : false,
				oldImage : selectedArtist?.image
			},
			image,
			showMsg
		);
	};
	useEffect(() => {
		if (!id || id === "") {
			navigate("artists", { replace: true });
			return;
		}
		setName(selectedArtist?.name);
		setEmail(selectedArtist?.email);
		setPhone(selectedArtist?.phone);
		setPrivacy(selectedArtist?.bio_data);
		setImage(null);
		setPreview(api + "/" + selectedArtist?.image);
	}, [id, navigate]);

	return (
		<div className="main-content">
			<div id="addm--food" className="container">
				<div className="form-container">
					<div className="form-header">
						<h2>Add An Artist</h2>
						<p ref={msgRef}></p>
					</div>

					<div className="form-body">
						<form onSubmit={handleSubmit}>
							<div className="form-group">
								<label>Select Artists Image</label>
								{preview && (
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
								)}
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
								<label>Enter Artist Name</label>
								<input
									type="text"
									name="name"
									placeholder="Enter artists name"
									onChange={e => setName(e.target.value)}
									value={name}
								/>
							</div>
							<div className="form-group">
								<label>Artist Contact Number</label>
								<input
									type="tel"
									name="tel"
									placeholder="Enter artists number"
									onChange={e => setPhone(e.target.value)}
									value={phone}
								/>
							</div>
							<div className="form-group">
								<label>Artist Email Address</label>
								<input
									type="email"
									name="email"
									placeholder="Enter artists email"
									onChange={e => setEmail(e.target.value)}
									value={email}
								/>
							</div>
							<div className="form-group">
								<label>
									Write Bio Data About Artist
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
										"Update Now"
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

export default EditArtist;
