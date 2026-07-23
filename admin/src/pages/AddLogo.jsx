import React, { useEffect, useRef, useState } from "react";
import "../styles/add-food.style.css";
import useContact from "../store/useContact";
import api from "../libs/api";

const AddLogo = () => {
	const { submitLogo, isSubmit } = useContact();
	const [selectedLogo, setSelectedLogo] = useState(null);
	const [previewLogo, setPreviewLogo] = useState(
		api + "/uploads/sites/logo.png"
	);
	const [errors, setErrors] = useState({});
	const msgRef = useRef(null);

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
		}, 3000);
	};

	const handleImageChange = e => {
		const file = e.target.files[0];
		if (!file) {
			showMsg("No image selected yet", false);
			return;
		}
		setSelectedLogo(file);
		setPreviewLogo(URL.createObjectURL(file));
	};
	const handleSubmit = e => {
		e.preventDefault();
		if (!selectedLogo) {
			showMsg("No logo selected", false);
			return;
		}
		submitLogo(selectedLogo, showMsg);
	};

	const resetForm = () => {
		setSelectedLogo(null);
		setPreviewLogo(api + "/uploads/sites/logo.png");
		setErrors({});
	};

	return (
		<div className="main-content">
			<div id="addm--food" className="container">
				<div className="form-container">
					<div className="form-header">
						<h2>Edit Site Logo</h2>
						<p ref={msgRef}></p>
					</div>

					<div className="form-body">
						<form onSubmit={handleSubmit}>
							<div className="form-group">
								<label>
									Select New Logo
									<span style={{ color: "#ef4444" }}>*</span>
								</label>
								<input
									type="file"
									accept="image/*"
									onChange={handleImageChange}
								/>
								<small>Only 1 image allowed</small>
								{errors.images && (
									<p
										style={{
											color: "#ef4444",
											marginTop: "5px"
										}}
									>
										{errors.images}
									</p>
								)}
							</div>
							<div className="image-grid">
								{previewLogo && (
									<div className="image-item">
										<img src={previewLogo} alt="" />
										<button
											type="button"
											className="remove-btn"
										>
											✕
										</button>
									</div>
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

export default AddLogo;
