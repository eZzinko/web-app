import React from 'react';
import Infocard from '../components/infocard';
import GroupCard from '../components/groupcard';
import InfoLargeCard from "../components/infolargecard";

const Mainpage = ({ recipes, recipe, setRecipe, mainImg, mainImgs, setMainImg }) => {
    let allItem = [...recipes];
    let row = [];
    let repeat;
    if (allItem.length >= 3) {
        repeat = 3;
    }
    else {
        repeat = allItem.length;
    }
    for (let i = 0; i < repeat; i++) {
        row.push(<GroupCard text={recipes[Math.floor(Math.random() * allItem.length)]} setRecipe={setRecipe} recipes={recipes} id={recipe.id} key={recipe.id} />);
    }

    let cards = [];
    for (let i = 0; i < allItem.length; i++) {
        cards.push(<GroupCard text={recipes[i]} setRecipe={setRecipe} recipes={recipes} id={recipe.id} key={recipe.id} />);
    }

    return (
        <>
            <div className="header">
                <Infocard mainImg={mainImg} setMainImg={setMainImg} mainImgs={mainImgs} setRecipe={setRecipe} key={mainImg.id} />
            </div>
            <div className="body-align">

                <div className="advice">
                    <h2>Tip dnešního dne</h2>
                    <div className="row">
                        {row}
                    </div>
                    <div className="mealofday">
                        <div className="card">
                            <InfoLargeCard key={recipe.id} />
                        </div>
                        <div className="image-box"></div>
                    </div>
                </div>
                <div className="category">
                    <h2>Kategorie</h2>
                    <div className="row">
                        {cards}
                    </div>
                </div>
            </div>
        </>
    );
}
export default Mainpage;