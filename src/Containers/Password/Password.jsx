import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { useFormik } from "formik";
import { passwordValidate } from "../../helpers/validate";
import { useAuthStore } from "../../store/store";
import { verifyPassword } from "../../helpers/helper";
import useFetch from "../../hooks/fetch.hook";
import { Navbar } from "../../Components";
import passwordeye from "../../assets/icon.svg";

import "./Password.scss";

const Password = () => {
	const [passwordType, setPasswordType] = useState("password");

	const navigate = useNavigate();
	const { username } = useAuthStore(state => state.auth);
	const data = useFetch(username);

	const click = (e) => {
		e.preventDefault();
		if (passwordType === "password") {
			setPasswordType("text");
		} else {
			setPasswordType("password");
		}
	};

	const formik = useFormik({
		initialValues: {
			password : ""
		},
		validate: passwordValidate,
		validateOnBlur: false,
		validateOnChange: false,
		onSubmit: async values => {
			let loginPromise = verifyPassword({ username, password : values.password });
			toast.promise(loginPromise, {
				loading: "Checking.....",
				success: <b>Login Successful...</b>,
				error: <b>Password Incorrect</b>
			});

			loginPromise.then(res => {
				let logindata = res.data;
				let token = logindata?.data?.token;
				localStorage.setItem("token", token);
				navigate("/profile");
			});
		}
	});

	return (
		<div>
			<Navbar />
			<Toaster position='bottom-center' reverseOrder={false} />
			<div className="app__password">
				<div className="app__password_content">
					<div className="app__password_content-title">
						<h3>Hello {data?.firstName || data?.username}</h3>
						<p>Please input your password</p>
					</div>
					<div className="app__password_content-stepper">
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
						<div className="top">
							<p>Enter Your Password:</p>
							<div className="hide" onClick={click}>
								<img src={passwordeye} alt="" />
								{passwordType === "password" ? <p>Show</p> : <p>Hide</p> }
							</div>
						</div>
						<input {...formik.getFieldProps("password")} type={passwordType} placeholder='Password' />
						<button type="submit">Sign In</button>
						<p>Forgot Pasword? <Link to="/recovery">Password Recovery</Link> </p>
					</form>
				</div>
			</div>

		</div>
	);
};

export default Password;