import React, { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useAuthStore } from "../../store/store";
import { generateOTP, verifyOTP } from "../../helpers/helper";
import { useNavigate } from "react-router-dom";
import { Navbar, Footer } from "../../Components";

import "./Recovery.scss";

const Recovery = () => {

	const { username } = useAuthStore(state => state.auth);
	const [OTP, setOTP] = useState();
	const navigate = useNavigate();

	useEffect(() => {
		generateOTP(username).then((OTP) => {
			if(OTP) return toast.success("OTP has been sent to your email!");
			return toast.error("Problem while generating OTP!");
		});
	}, [username]);

	const onSubmit = async (e) => {
		e.preventDefault();
		try {
			let { status } = await verifyOTP({ username, code : OTP });
			if(status == 201){
				toast.success("Verification Successful!");
				return navigate("/reset");
			}
		} catch (error) {
			return toast.error("Wrong OTP, Please confirm otp");
		}
	};

	const resendOTP = () => {
		let sentPromise = generateOTP(username);
		toast.promise(sentPromise,
			{
				loading: "Sending...",
				success: <b>OTP has been sent to your email!</b>,
				error: <b>OTP could not be sent</b>,
			}
		);
	};

	return (
		<div>
			<Navbar />
			<Toaster position='bottom-center' reverseOrder={false}></Toaster>
			<div className="app__recovery">
				<div className="app__recovery_content">
					<div className="app__recovery_content-title">
						<h3>Password Recovery</h3>
						<p>Enter the 6 digit OTP sent to your email to recover password</p>
					</div>
					<form action="" onSubmit={onSubmit}>
						<p>Enter OTP:</p>
						<input onChange={(e) => setOTP(e.target.value)} type="text" placeholder='OTP' />
						<button type="submit">Recover</button>
					</form>
					<p>Can&apos;t get OTP? <button onClick={resendOTP}>Resend OTP</button> </p>
				</div>
			</div>
			<Footer />
		</div>
	);
};

export default Recovery;