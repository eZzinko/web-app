import React from 'react';

const BlogDetailCard = ({ result, name }) => {
	return (
		<div className="blog-detail-card">
			<h4>{name}</h4>
			<ul>
				{result.map((item) => (
					<li>{item[1]}</li>
				))}
			</ul>
		</div>
	);
};
export default BlogDetailCard;
