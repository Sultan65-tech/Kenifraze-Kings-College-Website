import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useSearchParams, Navigate } from "react-router-dom";
import "../styles/login.css";
import { RiLockPasswordLine } from "react-icons/ri";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import useAuth from "../store/useAuth";

const SetNewPassword = () => {
	document.title =
		"Reset New Password For Access Admin Panel Dashboard Please Login";
	const localToken = localStorage.getItem("validate-email-token") || null;
	const [searchParams] = useSearchParams();
	const token = searchParams.get("token");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);
	const navigate = useNavigate();
	const msgRef = useRef(null);
	const formRef = useRef(null);
	const responseRef = useRef(null);
	const { resetPassword, isReseting } = useAuth();

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
		if (!password.trim()) {
			showMsg("New password is required", false);
			return false;
		} else if (!confirmPassword.trim()) {
			showMsg("Confirm password is required", false);
			return false;
		} else if (password.trim().length < 8) {
			showMsg("Minimum 8 characters required", false);
			return false;
		} else if (
			!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/.test(
				password.trim()
			)
		) {
			showMsg(
				"Use uppercase, lowercase, number & special character",
				false
			);
			return false;
		} else if (password.trim() !== confirmPassword.trim()) {
			showMsg("Passwords do not match", false);
			return false;
		}
		return true;
	};
	const getPasswordStrength = (paswd) => {
		if (paswd.length < 4) return "Weak";
		if (paswd.length < 8) return "Medium";
		if (/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/.test(paswd)) {
			return "Strong";
		}
		return "Medium";
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!validateForm()) return;
		await resetPassword(
			{
				password: password.trim(),
				token
			},
			showMsg,
			formRef.current,
			responseRef.current,
			navigate
		);
	};

	useEffect(() => {
		if (!token || token === "") {
			navigate("/admin-login", { replace: true });
			return;
		}
		if (!localToken || localToken !== token) {
			navigate("/admin-login", { replace: true });
			return;
		}
	}, [token, localToken, navigate]);

	return (
		<div className='login-page'>
			<div className='login-container'>
				<div className='form-container'>
					<form ref={formRef} onSubmit={handleSubmit}>
						<div className='form-group'>
							<p ref={msgRef}></p>
							<p id='info'>
								Set a new strongest password for admin dashboard
								panel...!
							</p>
							{/*<label>Enter Admin Email</label>*/}
							<div className='input-wrapper password-wrapper'>
								<i>
									<RiLockPasswordLine
										size={20}
										style={{ marginBottom: "5px" }}
									/>
								</i>
								<input
									type={showPassword ? "text" : "password"}
									name='password'
									placeholder='***********'
									value={password}
									onChange={(e) => {
										setPassword(e.target.value);
									}}
								/>
								<span
									className='toggle-password'
									onClick={() =>
										setShowPassword(!showPassword)
									}>
									{showPassword ? (
										<IoEyeOffOutline
											size={22}
											style={{ marginBottom: "5px" }}
										/>
									) : (
										<IoEyeOutline
											size={22}
											style={{ marginBottom: "5px" }}
										/>
									)}
								</span>
							</div>
							{password && (
								<div className='password-strength'>
									Strength:
									<span
										className={`strength ${getPasswordStrength(password).toLowerCase()}`}>
										{getPasswordStrength(password)}
									</span>
								</div>
							)}
						</div>
						<div className='form-group'>
							<div className='input-wrapper password-wrapper'>
								<i>
									<RiLockPasswordLine
										size={20}
										style={{ marginBottom: "5px" }}
									/>
								</i>
								<input
									type={
										showConfirmPassword
											? "text"
											: "password"
									}
									name='confirmpassword'
									placeholder='***********'
									value={confirmPassword}
									onChange={(e) => {
										setConfirmPassword(e.target.value);
									}}
								/>
								<span
									className='toggle-password'
									onClick={() =>
										setShowConfirmPassword(
											!showConfirmPassword
										)
									}>
									{showConfirmPassword ? (
										<IoEyeOffOutline
											size={22}
											style={{ marginBottom: "5px" }}
										/>
									) : (
										<IoEyeOutline
											size={22}
											style={{ marginBottom: "5px" }}
										/>
									)}
								</span>
							</div>
							{confirmPassword && (
								<div className='password-strength'>
									Strength:
									<span
										className={`strength ${getPasswordStrength(confirmPassword).toLowerCase()}`}>
										{getPasswordStrength(confirmPassword)}
									</span>
								</div>
							)}
						</div>
						<button
							disabled={isReseting}
							type='submit'
							className='login-btn'>
							{isReseting ? "Processing..." : "Reset Password"}
						</button>
					</form>
					{/*Response Container*/}
					<div ref={responseRef} className='response-container'>
						<span>Admin password has been reset successfully!</span>
					</div>
				</div>
			</div>
		</div>
	);
};

export default SetNewPassword;
