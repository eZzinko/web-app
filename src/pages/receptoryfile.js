import React from 'react';
import BlogCard from '../components/blogcard';
import BlogDetailCard from '../components/blogdetailcard';

const ReceptoryFile = ({ recipe }) => {
    const backgroundImage = {
        backgroundImage: `url(${recipe.cover})`
    }

    const object = recipe.ingre;
    // console.log(object);
    const result = Object.keys(object).map((key) => ["object", object[key]]);
    // console.log(result);
    return (
        <>
            <div className="cover" style={backgroundImage}>
                <div className="overlay"></div>
                {/* <h2>Přidejte fotografii</h2> */}
                <div className="cover-panel-full">
                    <div className="cover-panel">
                        <div className="item">
                            {recipe.madeTime} min
                        </div>
                        <div className="item">
                            <h3>{recipe.name}</h3>
                        </div>
                        <div className="item">
                            {recipe.madePrice} Kč
                        </div>
                    </div>
                </div>
            </div>
            <div className="body-align">
                <div className="short-info">
                    <p>{recipe.description}</p>
                </div>
                <div className="content-box">
                    <div className="content">
                        <BlogDetailCard result={result} name={"Ingredience"} />
                        <BlogDetailCard result={result} name={"Postup přípravy"} />
                    </div>
                    <div className="side-bar">
                        <p>uigui</p>
                        <p>uigui</p>
                        <p>uigui</p>
                        <p>uigui</p>
                        <p>uigui</p>

                        <p>uigui</p>
                        <p>uigui</p>
                        <p>uigui</p>

                        <p>uigui</p>

                    </div>
                </div>
            </div>
        </>
    );
}
export default ReceptoryFile;