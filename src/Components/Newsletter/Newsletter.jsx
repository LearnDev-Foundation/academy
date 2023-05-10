import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

import "./Newsletter.scss";

const formUrl = import.meta.env.VITE_FORM_URL;

const Newsletter = () => {
	const [email, setEmail] = useState("");

	const handleChange = (e) => {
		e.preventDefault();
		setEmail(e.target.value);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		const data = new FormData(e.target);

		try {
			const response = await fetch(formUrl, {
				method: "POST",
				body: data,
				headers: {
					accept: "application/json",
				}
			});
			const json = await response.json();

			if (json.status === "success") {
				toast.success("Thanks for subscribing");
				setEmail("");
			}
		} catch (err) {
			toast.error("Oops! Something went wrong, Please try again later.");
		}
	};
	return (
		<div className="app__newsletter">
			<Toaster position="bottom-center" reverseOrder={false} />
			<h3>Subscribe</h3>
			<form onSubmit={handleSubmit}>
				<input type="email" placeholder="Enter your email" aria-label="Enter your email" name="email_address" value={email} onChange={handleChange} required/>
				<button>Subscribe</button>
			</form>
			<p>By subscribing you agree to with our <a href="https://learndevfoundation.vercel.app/#/privacy" target="_blank" rel="noopener noreferrer" >Privacy Policy</a></p>
		</div>
	);
};

export default Newsletter;