import React, { useState, useRef } from "react";
import { useNavigate ,NavLink} from "react-router-dom";
import "../styles/login.css";
import { RiLockPasswordLine } from "react-icons/ri";
import { MdOutlineLocalPhone } from "react-icons/md";
import { AiOutlineMail } from "react-icons/ai";
import { FaRegUser } from "react-icons/fa6";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import useAuth from "../store/useAuth";

const Login = () => {
	document.title =
		"All Bizz Admin Login - Access Admin Panel Dashboard Please Login";
	const [formData, setFormData] = useState({
		email: "",
		password: ""
	});
	const navigate = useNavigate();
	const msgRef = useRef(null);
	const [errors, setErrors] = useState({});
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);
	const { isSigningIn, loginNow } = useAuth();

	// Handle Input Change
	const handleChange = e => {
		const { name, value } = e.target;

		setFormData(prev => ({
			...prev,
			[name]: value
		}));

		// Remove error while typing
		setErrors(prev => ({
			...prev,
			[name]: ""
		}));
	};
	const showMsg = (msg, type) => {
		if (type) {
			if (msgRef.current.classList.contains("error-msg")) {
				msgRef.current.classList.remove("error-msg");
			}
			msgRef.current.classList.add("success-msg");
			msgRef.current.textContent = msg;
		} else {
			if (msgRef.current.classList.contains("success-msg")) {
				msgRef.current.classList.remove("success-msg");
			}
			msgRef.current.classList.add("error-msg");
			msgRef.current.textContent = msg;
		}
		setTimeout(() => {
			msgRef.current.removeAttribute("class");
			msgRef.current.textContent = "";
		}, 2000);
	};
	const validateForm = () => {
		let newErrors = {};
		const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
		if (!formData.email.trim()) {
			newErrors.email = "Email is required";
		} else if (!emailRegex.test(formData.email)) {
			newErrors.email = "Invalid email address";
		}
		if (!formData.password) {
			newErrors.password = "Password is required";
		}
		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};
	const handleSubmit = async e => {
		e.preventDefault();
		if (!validateForm()) return;
		await loginNow(formData, showMsg, navigate);
	};

	return (
		<div className="login-page">
			<div className="login-container">
				<div className="form-container">
					<form onSubmit={handleSubmit}>
						<div className="form-group">
							<p ref={msgRef}></p>
							{/*<label>Enter Admin Email</label>*/}
							<div
								className={`input-wrapper ${
									errors.email ? "error-input" : ""
								}`}
							>
								<i>
									<AiOutlineMail
										size={20}
										style={{ marginTop: "4px" }}
									/>
								</i>
								<input
									type="email"
									name="email"
									placeholder="admin@example.com"
									value={formData.email}
									onChange={handleChange}
								/>
							</div>
							{errors.email && (
								<p className="error-text">{errors.email}</p>
							)}
						</div>
						<div className="form-group">
							{/*<label>Enter Admin Password</label>*/}
							<div
								className={`input-wrapper password-wrapper ${
									errors.password ? "error-input" : ""
								}`}
							>
								<i>
									<RiLockPasswordLine size={20} />
								</i>
								<input
									type={showPassword ? "text" : "password"}
									name="password"
									placeholder="***********"
									value={formData.password}
									onChange={handleChange}
								/>
								<span
									className="toggle-password"
									onClick={() =>
										setShowPassword(!showPassword)
									}
								>
									{showPassword ? (
										<IoEyeOffOutline
											size={22}
											style={{
												marginLeft: "20px",
												marginTop: "6px"
											}}
										/>
									) : (
										<IoEyeOutline
											size={22}
											style={{marginLeft: "20px", marginTop: "6px" }}
										/>
									)}
								</span>
							</div>
							{errors.password && (
								<p className="error-text">{errors.password}</p>
							)}
						</div>
						<button
							type="submit"
							className={`login-btn ${isSigningIn ? "isSigningIn-btn" : ""}`}
							disabled={isSigningIn}
						>
							{isSigningIn ? "Processing..." : "Login Now"}
						</button>
					</form>
					<p
						className="signin-link"
						style={{ marginTop: "20px", fontSize: "15px" }}
					>
						Forgot Password ?{" "}
						<NavLink to="/reset-password">Reset Now</NavLink>
					</p>
				</div>
				{/*
				<div className='footer'>
					© 2026 GramBhoj • All Rights Reserved
				</div>
				*/}
			</div>
		</div>
	);
};

export default Login;
