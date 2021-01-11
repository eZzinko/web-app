import React from 'react';

const BlogCard = () => {
    return (
        <div className="blogcard">
            <div className="img-place">
                <a href>Oběd</a>
                <div className="shadow-burn"></div>
            </div>
            <div className="text-area">
                <h3>Salát Halumi se švestkami, hrachové štufle s taco Meat ingrediencí</h3>
                <hr />
                <div className="text-area-footer">
                    <p>Napsal: <span>Daniel Neuman</span></p>
                    <p>22. 5. 2020</p>
                </div>
            </div>
        </div>
    )
}
export default BlogCard;