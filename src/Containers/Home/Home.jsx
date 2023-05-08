import React from "react";
import { Navbar } from "../../Components";
import { Link } from "react-router-dom";

import "./Home.scss";

const Home = () => {
	return (
		<div>
			<Navbar />
			<div className="app__home">
				<div className="app__home_content">
					<h2>Travel The World Of Tech With US</h2>
					<p>Join the LearnDev Academy and explore the endless possibilities of the tech world. Our courses provide you with the skills you need to succeed in the ever-changing landscape of the industry</p>
					<Link to="/academy">Get Started</Link>
				</div>
			</div>
		</div>
	);
};

export default Home;