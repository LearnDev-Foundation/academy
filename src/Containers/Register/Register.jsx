import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { useFormik } from "formik";
import { registerValidation } from "../../helpers/validate";
import { registerUser } from "../../helpers/helper";
import axios from "axios";
import { Navbar, Footer } from "../../Components";
import logo from "../../assets/logo.svg";
import passwordEye from "../../assets/icon.svg";

import "./Register.scss";

const Register = () => {
	const [passwordType, setPasswordType] = useState("password");
	const [isChecked, setIsChecked] = useState(true);

	const subscribeUrl = import.meta.env.VITE_FORM_URL;

	const navigate = useNavigate();



	const formik = useFormik({
		initialValues: {
			email: "",
			username: "",
			password : "",
			confirmPassword : ""
		},
		validate: registerValidation,
		validateOnBlur: false,
		validateOnChange: false,
		onSubmit: async values => {
			const formData = new FormData();
			formData.append("email_address", values.email);

			// for (let pair of formData.entries()) {
			// 	console.log(pair[0] + ": " + pair[1]);
			// }

			if (isChecked) {
				try {
					const response = await fetch(subscribeUrl, {
						method: "POST",
						body: formData,
						headers: {
							accept: "application/json",
						}
					});
					const json = await response.json();
        
					if (json.status === "success") {
						toast.success("You Subscribed to our Newsletter");
					}
				} catch (err) {
					console.error("Oops! Something went wrong. Please try again later.");
				}
			}

			axios.post("https://vast-jade-shrimp-hem.cyclic.app/api/register", values)
				.then(response => {
					toast.success(response?.data?.message);
					registerUser(values);
					navigate("/username");
				})
				.catch(error => {
					if(error.response.status === 409){
						toast.error(error?.response?.data?.message);
					}
				});
		}
	});

	const clickhandler = (e) => {
		e.preventDefault();
		if(passwordType === "password"){
			setPasswordType("text");
		} else {
			setPasswordType("password");
		}
	};

	const handleCheckChange = () => {
		setIsChecked(!isChecked);
	};

	return (
		<div>
			<Navbar />
			<Toaster position='bottom-center' reverseOrder={false}></Toaster>
			<div className="app__register">
				<div className="app__register_content">
					<div className="app__register_content-heading">
						<h3>Start Your Journey</h3>
						<p>Get access to lot’s of community contributed resources</p>
					</div>
					<img src={logo} alt="" />
				</div>
				<form onSubmit={formik.handleSubmit}>
					<h3>Sign up now</h3>
					<div className="inputs">
						<div className="input-field">
							<h6>Email address</h6>
							<input {...formik.getFieldProps("email")} type="email" />
						</div>
						<div className="input-field">
							<h6>Username</h6>
							<input {...formik.getFieldProps("username")} type="text" />
						</div>
						<div className="input-field">
							<div className="top">
								<h6>Password</h6>
								<div className="hide" onClick={clickhandler}>
									<img src={passwordEye} alt="" />
									{passwordType === "password" ? <p>Show</p> : <p>Hide</p>}
								</div>
							</div>
							<input {...formik.getFieldProps("password")} type={passwordType} />
							<p>Use 8 or more characters with a mix of letters, numbers & symbols</p>
						</div>
						<div className="input-field">
							<h6>Confirm Password</h6>
							<input {...formik.getFieldProps("confirmPassword")} type={passwordType} />
						</div>
					</div>
					<p>By creating an account, you agree to our <a href="https://learndevfoundation.vercel.app/#/tos" target="_blank" rel="noreferrer">Terms of Service</a> and <a href="https://learndevfoundation.vercel.app/#/privacy" target="_blank" rel="noreferrer">Privacy Policy</a> </p>
					<div className="checkbox">
						<input type="checkbox" name="subscribe" id="subscribe" checked={isChecked} onChange={handleCheckChange}/>
						<p>Subscribe to receive updates and wonderful tech tips.</p>
					</div>
					<div className="bottom">
						<button type='submit'>Sign Up</button>
						<p>Already have an account? <Link to="/username">Log in</Link></p>
					</div>
				</form>
			</div>
			<Footer />
		</div>
	);
};

export default Register;