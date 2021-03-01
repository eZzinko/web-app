import React from 'react';
import { Link } from 'react-router-dom';


const BlogCard = ({ data, setAsyncDataActive, setAsyncDataID }) => {
    const backgroundImage = {
        backgroundImage: `url(${data.cover})`
        // backgroundImage: "url(https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&amp;cs=tinysrgb&amp;dpr=3&amp;h=750&amp;w=1260)"
    }
    // const linkHandler = () => {
    //     const selectedRecipe = recipes.filter((state) => state.id === id);
    //     setRecipe(selectedRecipe[0]);
    // }
    const timestamp = new Date(data.createdAt);
    const humanDate = new Date(timestamp).getDate() + '. ' + (new Date(timestamp).getMonth() + 1) + '. ' + new Date(timestamp).getFullYear();

    // useEffect(() => {
    // setAsyncDataID(data.id);

    // })
    return (
        <Link to={`/receptar/${data.id}`} className="blogcard">
            {/* <div className="blogcard" onClick={linkHandler}> */}
            <div className="blogcard">
                <div className="img-place" style={backgroundImage}>
                    <div className="shadow-burn"></div>
                </div>
                <div className="text-area">
                    <h3>{data.name}</h3>
                    <hr />
                    <div className="text-area-footer">
                        <span>Napsal: <span>{data.artist}</span></span>
                        <span>{humanDate}</span>
                    </div>
                </div>
            </div>
        </Link>
    )
}
export default BlogCard;