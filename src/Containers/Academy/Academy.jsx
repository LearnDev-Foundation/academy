import React from "react";
import { Navbar, Footer, Newsletter } from "../../Components";
import topics from "../../assets/data/topics.json";
import { Link } from "react-router-dom";

import "./Academy.scss";

const Academy = () => {
	const items = [];
    
	for (const topic in topics) {
		// eslint-disable-next-line no-prototype-builtins
		if (topics.hasOwnProperty(topic)) {
			const obj = topics[topic];
			items.push(
				<div className="app__academy_learn-topic" key={obj.slug}>
					<h3>{obj.topic}</h3>
					<p>{obj.description}</p>
					<Link to={`/academy/${obj.slug}`} state={{ data: obj.chapterList }}>Start Learning</Link>
				</div>
			);
		}
	}

	return (
		<div>
			<Navbar />
			<div className="app__academy">
				<h4>What would you like to learn?</h4>
				<div className="app__academy_learn">{items}</div>
			</div>
			<Newsletter />
			<Footer />
		</div>
	);
};

export default Academy;