import React from 'react';
import { Link } from 'react-router-dom';


const BlogCard = ({ recipe, setRecipe, recipes, id }) => {
    const backgroundImage = {
        backgroundImage: `url(${recipe.cover})`
    }
    const linkHandler = () => {
        const selectedRecipe = recipes.filter((state) => state.id === id);
        setRecipe(selectedRecipe[0]);
    }
    return (
        <Link to={`/receptar/${recipe.id}`} className="blogcard">
            <div className="blogcard" onClick={linkHandler}>
                <div className="img-place" style={backgroundImage}>
                    <div className="shadow-burn"></div>
                </div>
                <div className="text-area">
                    <h3>{recipe.name}</h3>
                    <hr />
                    <div className="text-area-footer">
                        <p>Napsal: <span>{recipe.artist}</span></p>
                        <p>{recipe.createdAt}</p>
                    </div>
                </div>
            </div>
        </Link>
    )
}
export default BlogCard;