import React, { useState, useEffect } from "react";
import { Navbar, Footer } from "../../../Components";
import { useLocation, Link } from "react-router-dom";

import "./Chapters.scss";

const Chapters = () => {
	const location = useLocation();
	const { data } = location.state;

	const [courseData, setCourseData] = useState("");

	useEffect(() => {
		import(`../../../assets/data/Chapters/${data}.json`).then((chapters) => {
			setCourseData(chapters);
		});
	}, []);

	const chapters = courseData.chapters;

	if (!courseData) {
		return <div>Loading....</div>;
	}

	return (
		<div>
			<Navbar />
			<div className="app__chapters">
				<div className="app__chapters_title">
					<h2>{courseData.name}</h2>
					<p>{courseData.description}</p>
				</div>
				<ol>
					{Object.keys(chapters).map((key) => {
						const item = chapters[key];
						return (
							<li key={key}>
								<Link to={`/learn/${item.title}`} state={{ data: item.file }}>{item.title}</Link>
							</li>
						);
					})}
				</ol>
			</div>
			<Footer />
		</div>
	);
};

export default Chapters;