import React from 'react';
import { Link } from 'react-router-dom';

const CategoryCard = ({ item }) => {
	return (
		<Link className="category" to="/receptar">
			<div className="category">
				<h2 className="category__heading">{item}</h2>
			</div>
		</Link>
	);
};
export default CategoryCard;
