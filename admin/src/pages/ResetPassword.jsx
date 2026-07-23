import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/login.css";
import { AiOutlineMail } from "react-icons/ai";
import useAuth from "../store/useAuth";

const ResetPassword = () => {
	document.title =
		"Reset Admin Password - Access Admin Panel Dashboard Please Login";
	const [email, setEmail] = useState("");
	const navigate = useNavigate();
	const msgRef = useRef(null);
	const formRef = useRef(null);
	const responseRef = useRef(null);
	const { validateEmail, isValidating } = useAuth();

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
		const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
		if (!email.trim()) {
			showMsg("Email is required", false);
			return false;
		} else if (!emailRegex.test(email)) {
			showMsg("Invalid email address", false);
			return false;
		}
		return true;
	};
	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!validateForm()) return;
		await validateEmail(
			email,
			showMsg,
			formRef.current,
			responseRef.current
		);
	};

	return (
		<div className='login-page'>
			<div className='login-container'>
				<div className='form-container'>
					<form ref={formRef} onSubmit={handleSubmit}>
						<div className='form-group'>
							<p ref={msgRef}></p>
							<p id='info'>
								For resetting the admin password please confirm
								your email address...!
							</p>
							{/*<label>Enter Admin Email</label>*/}
							<div className='input-wrapper'>
								<i>
									<AiOutlineMail
										size={20}
										style={{ marginTop: "4px" }}
									/>
								</i>
								<input
									type='email'
									name='email'
									placeholder='admin@example.com'
									value={email}
									onChange={(e) => {
										setEmail(e.target.value);
									}}
								/>
							</div>
						</div>
						<button
							disabled={isValidating}
							type='submit'
							className='login-btn'>
							{isValidating ? "Processing..." : "Verify Email"}
						</button>
					</form>
					{/*Response Container*/}
					<div ref={responseRef} className='response-container'>
						<span>
							Thanks ! a verification link has been sent your
							email account! please check your email inbox
						</span>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ResetPassword;
