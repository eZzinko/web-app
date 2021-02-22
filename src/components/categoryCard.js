import React from 'react';
import { Link } from 'react-router-dom';


const CategoryCard = ({ item }) => {
    // console.log(item);
    return (
        <Link className="blogcard" to="/receptar">
            <div className="groupcard" >
                {item}
                <div className="shadow-burn"></div>
            </div>
        </Link>
    )
}
export default CategoryCard;