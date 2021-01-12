import React, { useState } from 'react';
import RecepieCard from '../components/recepiecard';
import data from '../utils/util';


const ReceptoryFile = ({ match }) => {
    // eslint-disable-next-line 
    const [recipes, setRecipes] = useState(data());
    // eslint-disable-next-line 
    const [recipe, setRecipe] = useState(recipes[1]);
    useState(() => {
        console.log(match);
    })
    return (
        <>
            <div className="cover">
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
                        {/* <RecepieCard />
                        <RecepieCard />
                        <RecepieCard /> */}
                        {recipe.ingredients.map((recipe) => (
                            <RecepieCard recipe={recipe} />
                        ))}
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