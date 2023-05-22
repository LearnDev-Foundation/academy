import React, { useState, useEffect } from "react";
import { Navbar } from "../../../Components";
import { Link, useLocation } from "react-router-dom";
import Gist from "react-gist";

import "./Content.scss";

const Content = () => {
	const location = useLocation();
	const { data } = location.state;

	const splitData = data.split("/");

	const [content, setContent] = useState("");
	const [chapters, setChapters] = useState("");

	import(`../../../assets/data/Content/${splitData[0]}/${splitData[1]}.json`)
		.then((content) => {
			setContent(content);
		});

	import(`../../../assets/data/Chapters/${splitData[0]}.json`)
		.then((chapters) => {
			setChapters(chapters.chapters);
		});
	useEffect(() => {
	}, []);
	
	const courseContent = content.content;

	console.log();

	if (!content) {
		return <div>Loading....</div>;
	} else if (!chapters) {
		return <div>Loading....</div>;
	}else {
		return (
			<div>
				<Navbar />
				<div className="app__content">
					<h1>{content.title}</h1>
					{Object.keys(courseContent).map((key) => {
						const item = courseContent[key];
						return (
							<div key={key}>
								<h2>{item.heading}</h2>
								{item.text && <p>{item.text}</p>}
								{item.codeblock && <Gist id={item.codeblock} />}
							</div>
						);
					})}
					<div className="app__content_chapters">
						<h2>Chapters</h2>
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
				</div>
			</div>
		);
	}

};

export default Content;