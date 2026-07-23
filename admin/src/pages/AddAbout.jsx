import React, { useRef, useState, useEffect } from "react";
import "../styles/add-food.style.css";
import useContact from "../store/useContact";

const AddAbout = () => {
	const { submitAbout, fetchAbout, about, isFetching, isSubmit } =
		useContact();
	const [privacy, setPrivacy] = useState("");
	const [errors, setErrors] = useState({});
	const msgRef = useRef(null);

	useEffect(() => {
		fetchAbout();
	}, []);

	useEffect(() => {
		if (!isFetching && about) {
			setPrivacy(about);
		}
	}, [about, isFetching]);

	const validate = () => {
		const newErrors = {};
		if (!privacy.trim()) {
			newErrors.privacy = "About content is required";
		} else if (privacy.trim().length < 50) {
			newErrors.privacy = "About must contain at least 50 characters";
		} else if (privacy.length > 10000) {
			newErrors.privacy = "About content cannot exceed 10000 characters";
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

	const handleSubmit = e => {
		e.preventDefault();
		if (!validate()) {
			showMsg("Write about descriptions", false);
			return;
		}
		submitAbout({ aboutContent: privacy.trim() }, showMsg);
		// API Call Here
		// showMsg("About content updated successfully.", true);
	};

	const resetForm = () => {
		setPrivacy("");
		setErrors({});
	};

	return (
		<div className="main-content">
			<div id="addm--food" className="container">
				<div className="form-container">
					<div className="form-header">
						<h2>Edit About Content</h2>
						<p ref={msgRef}></p>
					</div>

					<div className="form-body">
						<form onSubmit={handleSubmit}>
							<div className="form-group">
								<label>
									Write About Content
									<span style={{ color: "#ef4444" }}>*</span>
								</label>

								<textarea
									rows="8"
									placeholder="Write About Content..."
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
										{privacy.length}/10000 characters
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
									type="button"
									className="btn btn-reset"
									onClick={resetForm}
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

export default AddAbout;
