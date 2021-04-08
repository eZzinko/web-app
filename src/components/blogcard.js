import React from 'react';
import { Link } from 'react-router-dom';

const BlogCard = ({ data }) => {
	const backgroundImage = {
		backgroundImage: `url(${data.cover})`,
	};

	const timestamp = new Date(data.createdAt);
	const humanDate = new Date(timestamp).getDate() + '. ' + (new Date(timestamp).getMonth() + 1) + '. ' + new Date(timestamp).getFullYear();

	return (
		<Link to={`/receptar/${data.id}`} className="blogcard">
			<div className="blogcard">
				<div className="img-place" style={backgroundImage}></div>
				<div className="text-area">
					<h3>{data.name}</h3>
					<hr />
					<div className="text-area-footer">
						<span>
							Napsal: <span>{data.artist}</span>
						</span>
						<span>{humanDate}</span>
					</div>
				</div>
			</div>
		</Link>
	);
};
export default BlogCard;
