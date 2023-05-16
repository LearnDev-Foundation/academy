/* eslint-disable no-unused-vars */
import React from "react";
import { Link } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { useFormik } from "formik";
import { profileValidation } from "../../helpers/validate";
import { useNavigate } from "react-router-dom";
import { updateUser } from "../../helpers/helper";
import { Navbar, Footer } from "../../Components";
import useFetch from "../../hooks/fetch.hook";
import jwt_decode from "jwt-decode";

import "./Profile.scss";

const Profile = () => {
	const navigate = useNavigate();

	// const token = localStorage.getItem("token");
	// const decoded = jwt_decode(token);

	// const data = useFetch(decoded.user);
	const data = "";

	const formik = useFormik({
		initialValues : {
			firstName: data?.firstName || "",
			lastName : data?.lastName || "",
			username : data?.username || "",
			email : data?.email || "",
			twitter : data?.twitter || "",
			linkedin : data?.linkedin ||  "",
			github : data?.github || "",
		},
		enableReinitialize : true,
		validate : profileValidation,
		validateOnBlur : false,
		validateOnChange : false,
		onSubmit : async values => {
			let updatePromise = updateUser(values);

			toast.promise(updatePromise, {
				loading: "Updating...",
				success: <b>Update Successful</b>,
				error: <b>Could not process update</b>
			});

			updatePromise.then(() => {
				navigate("/academy");
			});
		}
	});

	function userLogout(){
		localStorage.removeItem("token");
		navigate("/");
	}

	return (
		<div>
			<Navbar />
			<Toaster position='bottom-center' reverseOrder={false}></Toaster>
			<div className="app__profile">
				<div className="app__profile_heading">
					<h3>Profile</h3>
					<p>Update your profile</p>
				</div>
				<form onSubmit={formik.handleSubmit}>
					<div className="pair">
						<div className="input">
							<h6>First Name</h6>
							<input {...formik.getFieldProps("firstName")} type='text' />
						</div>
						<div className="input">
							<h6>Last Name</h6>
							<input {...formik.getFieldProps("lastName")} type='text' />
						</div>
					</div>
					<div className="pair">
						<div className="input">
							<h6>Username</h6>
							<input {...formik.getFieldProps("username")} type='text' />
						</div>
						<div className="input">
							<h6>Email</h6>
							<input {...formik.getFieldProps("email")} type='email' />
						</div>
					</div>
					<div className="pair">
						<div className="input">
							<h6>Twitter</h6>
							<input {...formik.getFieldProps("twitter")} type='text' placeholder='https://' />
						</div>
						<div className="input">
							<h6>Linkedin</h6>
							<input {...formik.getFieldProps("linkedin")} type='text' placeholder='https://' />
						</div>
					</div>
					<div className="pair">
						<div className="input">
							<h6>Github</h6>
							<input {...formik.getFieldProps("github")} type='text' placeholder='https://' />
						</div>
						<div className="input">
							<button type='submit'>Update</button>
						</div>
					</div>
				</form>
				<Link to="/academy">Skip</Link>
				<button onClick={userLogout}>Logout</button>
			</div>
			<Footer />
		</div>
	);
};

export default Profile;
