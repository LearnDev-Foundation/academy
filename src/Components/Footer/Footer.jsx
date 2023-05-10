import React from "react";
import logo from "../../assets/logo.svg";
import github from "../../assets/github.svg";
import twitter from "../../assets/twitter.svg";
import email from "../../assets/email.svg";

import "./Footer.scss";

const Footer = () => {
	return (
		<div className="app__footer">
			<div className="app__footer_content">
				<div className="app__footer_content-logo">
					<img src={logo} alt="" />
					<h3>LearnDev Foundation</h3>
				</div>
				<div className="app__footer_content-links">
					<a href="https://learndevfoundation.vercel.app/" target="_blank" rel="noopener noreferrer">LearnDev Foundation</a>
					<a href="https://ldfroadmaps.vercel.app/">Roadmaps</a>
					<a href="https://ldfhowto.vercel.app/" target="_blank" rel="noopener noreferrer">Blog</a>
				</div>
				<div className="app__footer_content-socials">
					<a href="mailto:learndevfoundation@gmail.com" target="_blank" rel="noopener noreferrer"><img src={email} alt="" /></a>
					<a href="https://github.com/learndev-foundation" target="_blank" rel="noopener noreferrer"><img src={github} alt="" /></a>
					<a href="https://twitter.com/LearnDevFdn" target="_blank" rel="noopener noreferrer"><img src={twitter} alt="" /></a>
				</div>
			</div>
			<div className="app__footer_credits">
				<div className="app__footer_credits-links">
					<a href="https://learndevfoundation.vercel.app/#/privacy">Privacy Policy</a>
					<a href="https://learndevfoundation.vercel.app/#/tos">Terms of Service</a>
					<a href="https://learndevfoundation.vercel.app/#/contribute">Contribute</a>
				</div>
				<p>©2023, All right reserved.</p>
			</div>
		</div>
	);
};

export default Footer;