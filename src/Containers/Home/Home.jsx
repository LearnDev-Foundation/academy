import React from "react";
import { Navbar, Blog, Newsletter, Footer } from "../../Components";
import { Link } from "react-router-dom";
import topics from "../../assets/data/topics.json";

import "./Home.scss";

const Home = () => {
	const items = [];

	let count = 0;
	for (const topic in topics) {
		// eslint-disable-next-line no-prototype-builtins
		if (topics.hasOwnProperty(topic)) {
			const obj = topics[topic];
			items.push(
				<div className="app__learn_topic" key={obj.slug}>
					<div className="app__learn_topic-heading">
						<h3>{obj.topic}</h3>
						<Link to={`/academy/${obj.slug}`} state={{ data: obj.chapterList }}>Start Learning</Link>
					</div>
					<div className="app__learn_topic-description">
						<p>{obj.description}</p>
					</div>
				</div>
			);
			count++;
			if (count === 4) {
				break;
			}
		}
	}

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
			<div className="app__learn">
				<div className="content">{items}</div>
				<Link>Explore</Link>
			</div>
			<Blog />
			<Newsletter />
			<Footer />
		</div>
	);
};

export default Home;