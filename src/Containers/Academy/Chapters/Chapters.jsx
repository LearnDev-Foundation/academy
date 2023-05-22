import React, { useState, useEffect } from "react";
import { Navbar } from "../../../Components";
import { useLocation, Link } from "react-router-dom";

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
								<h3>{item.title}</h3>
								<Link to={`/learn/${item.title}`} state={{ data: item.file }}>Learn</Link>
							</li>
						);
					})}
				</ol>
			</div>
		</div>
	);
};

export default Chapters;