import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useFormik } from "formik";
import { resetPasswordValidation } from "../../helpers/validate";
import { resetPassword } from "../../helpers/helper";
import { useAuthStore } from "../../store/store";
import { useNavigate } from "react-router-dom";
import { Navbar, Footer } from "../../Components";
import passwordeye from "../../assets/icon.svg";

import "./Reset.scss";

const Reset = () => {
	const [passwordType, setPasswordType] = useState("password");

	const { username } = useAuthStore(state => state.auth);
	const navigate = useNavigate();

	const formik = useFormik({
		initialValues: {
			password : "",
			confirm_pwd: ""
		},
		validate: resetPasswordValidation,
		validateOnBlur: false,
		validateOnChange: false,
		onSubmit: async values => {
			let resetPromise = resetPassword({ username, password : values.password });

			toast.promise(resetPromise, {
				loading: "Updating...",
				success: <b>Password Reset Successful</b>,
				error: <b>Could not reset password</b>
			});

			resetPromise.then(function(){ navigate("/password"); });
		}
	});

	const click = (e) => {
		e.preventDefault();
		if (passwordType === "password") {
			setPasswordType("text");
		} else {
			setPasswordType("password");
		}
	};

	return (
		<div>
			<Navbar />
			<Toaster position='bottom-center' reverseOrder={false}></Toaster>
			<div className="app__reset">
				<div className="app__reset_content">
					<div className="app__reset_content-title">
						<h3>Reset Password</h3>
						<p>Enter new password</p>
					</div>
					<form action="" onSubmit={formik.handleSubmit}>
						<div className="top">
							<p>Enter Your Password:</p>
							<div className="hide" onClick={click}>
								<img src={passwordeye} alt="" />
								{passwordType === "password" ? <p>Show</p> : <p>Hide</p> }
							</div>
						</div>
						<input {...formik.getFieldProps("password")} type={passwordType} placeholder='New Password' />
						<p>Confirm Password:</p>
						<input {...formik.getFieldProps("confirm_pwd")} type={passwordType} placeholder='Confirm Password' />
						<button type="submit">Reset</button>
					</form>
				</div>
			</div>
			<Footer />
		</div>
	);
};

export default Reset;