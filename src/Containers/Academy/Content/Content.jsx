import React, { useState, useEffect } from "react";
import { Navbar } from "../../../Components";
import { useLocation } from "react-router-dom";
// import ReactMarkdown from "react-markdown";
import Gist from "react-gist";


const Content = () => {
	const location = useLocation();
	const { data } = location.state;

	const splitData = data.split("/");

	const [content, setContent] = useState("");

	useEffect(() => {
		import(`../../../assets/data/Content/${splitData[0]}/${splitData[1]}.json`)
			.then((content) => {
				setContent(content);
			});
	}, []);
	
	const courseContent = content.content;
	// console.log(courseContent);

	if (!content) {
		return <div>Loading....</div>;
	}

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
			</div>
		</div>
	);
};

export default Content;