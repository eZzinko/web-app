import React, { useEffect } from 'react';
import Infocard from '../components/infocard';
// import GroupCard from '../components/groupcard';
import InfoLargeCard from "../components/infolargecard";
import CategoryCard from '../components/categoryCard';
import { v4 as uuid4 } from "uuid";

const Mainpage = ({ recipes, recipe, setRecipe, mainImg, mainImgs, setMainImg }) => {
    // let allItem = [...recipes];
    let row = [];
    // let repeat;
    // if (allItem.length >= 3) {
    //     repeat = 3;
    // }
    // else {
    //     repeat = allItem.length;
    // }
    // for (let i = 0; i < repeat; i++) {
    //     row.push(<GroupCard text={recipes[Math.floor(Math.random() * allItem.length)]} setRecipe={setRecipe} recipes={recipes} id={recipe.id} key={recipe.id} />);
    // }

    let categoryArr = [];
    // eslint-disable-next-line
    recipes.map(tag => {
        if (categoryArr.indexOf(tag.category) === -1) {
            categoryArr.push(tag.category);
        }

    })
    const cardArr = []
    categoryArr.forEach((item) => {
        cardArr.push(<CategoryCard item={item} key={uuid4()} />);
    });
    console.log(categoryArr);

    useEffect(() => {
        document.title = `Moje kuchařka`;
    })

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
                        {cardArr}
                    </div>
                </div>
            </div>
        </>
    );
}
export default Mainpage;