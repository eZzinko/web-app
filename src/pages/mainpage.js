//Modules
import React, { useEffect } from 'react';
import { v4 as uuid4 } from "uuid";

//Components
import Infocard from '../components/infocard';
import InfoLargeCard from "../components/infolargecard";
import CategoryCard from '../components/categoryCard';

const Mainpage = ({ recipes, recipe, setRecipe, mainImg, mainImgs, setMainImg }) => {

    //Set document title
    useEffect(() => {
        document.title = `Moje kuchařka`;
    })

    //Filter categories
    const categoryArr = [];
    const cardArr = [];

    // eslint-disable-next-line
    recipes.map(tag => {
        if (categoryArr.indexOf(tag.category) === -1) {
            categoryArr.push(tag.category);
        }
    })

    categoryArr.forEach((item) => {
        cardArr.push(<CategoryCard item={item} key={uuid4()} />);
    });

    console.log("[Categories]: ", categoryArr);

    return (
        <>
            <div className="header">
                <Infocard mainImg={mainImg} setMainImg={setMainImg} mainImgs={mainImgs} setRecipe={setRecipe} key={mainImg.id} />
            </div>
            <div className="body-align">

                <div className="advice">
                    <h2>Tip dnešního dne</h2>
                    <div className="row">
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