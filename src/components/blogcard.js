import React from 'react';



const BlogCard = ({ recipe }) => {
    var backgroundImage = {
        backgroundImage: `url(${recipe.cover})`
    }
    return (
        <div className="blogcard">
            <div className="img-place" style={backgroundImage}>
                <div className="shadow-burn"></div>
            </div>
            <div className="text-area">
                <h3>{recipe.name}</h3>
                <hr />
                <div className="text-area-footer">
                    <p>Napsal: <span>{recipe.artist}</span></p>
                    <p>22. 5. 2020</p>
                </div>
            </div>
        </div>
    )
}
export default BlogCard;