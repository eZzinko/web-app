import React from 'react';
import { Link } from 'react-router-dom';

const GroupCard = ({ text, setRecipe, recipes }) => {
	const backgroundImage = {
		backgroundImage: `url(${text.cover})`,
	};
	const linkHandler = () => {
		const selectedRecipe = recipes.filter((state) => state.id === text.id);
		setRecipe(selectedRecipe[0]);
	};
	return (
		<Link to={`/receptar/${text.id}`} className="blogcard">
			<div className="groupcard" style={backgroundImage} onClick={linkHandler}>
				<h2>{text.name}</h2>
				<div className="shadow-burn"></div>
			</div>
		</Link>
	);
};
export default GroupCard;
