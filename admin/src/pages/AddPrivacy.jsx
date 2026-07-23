import React, { useRef, useEffect, useState } from "react";
import "../styles/add-food.style.css";
import useContact from "../store/useContact";

const AddPrivacy = () => {
	const [privacyVal, setPrivacy] = useState("");
	const [errors, setErrors] = useState({});
	const msgRef = useRef(null);
	const { submitPrivacy, fetchPrivacy, privacy, isFetching, isSubmit } =
		useContact();
	useEffect(() => {
		fetchPrivacy();
	}, []);

	useEffect(() => {
		if (!isFetching && privacy) {
			setPrivacy(privacy);
		}
	}, [privacy, isFetching]);
	const validate = () => {
		const newErrors = {};

		if (!privacyVal?.trim()) {
			newErrors.privacy = "Privacy Policy is required";
		} else if (privacyVal?.trim().length < 50) {
			newErrors.privacy =
				"Privacy Policy must contain at least 50 characters";
		} else if (privacyVal?.length > 10000) {
			newErrors.privacy = "Privacy Policy cannot exceed 10000 characters";
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
			showMsg("Write privacy descriptions", false);
			return;
		}
		submitPrivacy({ privacyContent: privacyVal }, showMsg);
		// API Call Here
		// showMsg("Privacy Policy updated successfully.", true);
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
						<h2>Edit Privacy & Policy</h2>
						<p ref={msgRef}></p>
					</div>

					<div className="form-body">
						<form onSubmit={handleSubmit}>
							<div className="form-group">
								<label>
									Write Privacy Policy
									<span style={{ color: "#ef4444" }}>*</span>
								</label>

								<textarea
									rows="8"
									placeholder="Write Privacy Policy..."
									value={privacyVal}
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
										{privacyVal?.length}/10000 characters
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

export default AddPrivacy;
