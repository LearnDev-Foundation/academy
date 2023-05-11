import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Navbar, Footer } from "../../Components";
import { Toaster } from "react-hot-toast";
import { useFormik } from "formik";
import { usernameValidate } from "../../helpers/validate";
import { useAuthStore } from "../../store/store";

import "./Username.scss";

const Username = () => {

	const navigate = useNavigate();
	const setUsername = useAuthStore(state => state.setUsername);

	const formik = useFormik({
		initialValues: {
			username : ""
		},
		validate: usernameValidate,
		validateOnBlur: false,
		validateOnChange: false,
		onSubmit: async values => {
			setUsername(values.username);
			navigate("/password");
		}
	});

	return (
		<div>
			<Navbar />
			<Toaster position='bottom-center' reverseOrder={false}></Toaster>
			<div className="app__username">
				<div className="app__username_content">
					<div className="app__username_content-title">
						<h3>Login</h3>
						<p>Don&apos;t have an account? <Link to="/register">Sign Up</Link></p>
					</div>
					<div className="app__username_content-stepper">
						<div className="one">
							<div className="number">
								<p>1</p>
							</div>
							<p>Enter Your Username</p>
						</div>
						<div className="two">
							<div className="number">
								<p>2</p>
							</div>
							<p>Enter Your Password</p>
						</div>
					</div>
					<form action="" onSubmit={formik.handleSubmit}>
						<p>Enter Your Username:</p>
						<input {...formik.getFieldProps("username")} type="text" placeholder='Username' />
						<button type="submit">Proceed</button>
					</form>
				</div>

			</div>
			<Footer />
		</div>
	);
};

export default Username;