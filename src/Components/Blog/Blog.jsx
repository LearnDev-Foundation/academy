import React, { useState, useEffect } from "react";
import sanityClient from "../../../client.js";

import "./Blog.scss";

const Blog = () => {
	const [articles, setArticles] = useState(null);

	useEffect(() => {
		sanityClient
			.fetch(
				`*[_type == "post"] | order(publishedAt desc)[0...3] {
                title,
                slug,
                mainImage{
                asset->{
                    _id,
                    url
                }
                },
                author,
                articleSummary,
            }`
			)
			.then((data) => setArticles(data))
			.catch(console.error);
	});

	return (
		<div className="app__blog">
			<div className="app__blog_title">
				<h2>Blog</h2>
				<p>Check out our latest articles</p>
			</div>
			<div className="app__blog_latest">
				{ articles && articles.map((article) => (
					<a href={"https://ldfhowto.vercel.app/#/articles/" + article.slug.current} key={article.slug.current} className="app__blog_latest-article" target="_blank" rel="noopener noreferrer">
						<img src={article.mainImage.asset.url} alt="" />
						<div className="app__blog_latest-article_content">
							<h2>{article.title}</h2>
							<h4>{article.author}</h4>
							<p>{article.articleSummary.slice(0, 100)}.....</p>
						</div>
					</a>
				))}
			</div>
		</div>
	);
};

export default Blog;