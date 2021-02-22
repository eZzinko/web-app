//Modules
import React, { useEffect, useState } from 'react';
import { v4 as uuid4 } from "uuid";
import firebase from '../firebase';

//Components
import Infocard from '../components/infocard';
import InfoLargeCard from "../components/infolargecard";
import CategoryCard from '../components/categoryCard';
import PlaceholderCard from '../components/placeholderCard';

const Mainpage = ({ recipes, recipe, setRecipe, mainImg, mainImgs, setMainImg }) => {

    //Set document title
    useEffect(() => {
        document.title = `Moje kuchařka`;
    })

    //Filter categories
    // const categoryArr = [];
    // const cardArr = [];

    // eslint-disable-next-line
    // recipes.map(tag => {
    //     if (categoryArr.indexOf(tag.category) === -1) {
    //         categoryArr.push(tag.category);
    //     }
    // })

    // categoryArr.forEach((item) => {
    //     cardArr.push(<CategoryCard item={item} key={uuid4()} />);
    // });

    // console.log("[Categories]: ", categoryArr);






    const ref = firebase.firestore().collection("recipe");

    const [firestoreLoading, setFirestoreLoading] = useState(true);

    const [asyncData, setAsyncData] = useState([]);
    const [asyncCategory, setAsyncCategory] = useState([]);

    const getRecipes = async () => {
        const allArr = [];
        const categoryArr = [];
        const allReciper = await ref.get();
        for (const doc of allReciper.docs) {
            allArr.push(doc.data());
            categoryArr.push(doc.data().category);
        }
        setAsyncData(allArr);
        setAsyncCategory(categoryArr);
    }
    const uniqeCat = [...new Set(asyncCategory)];

    //Execute API get request
    useEffect(() => {
        getRecipes();
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        if (asyncData.length > 0) {
            console.log("Undefined");
            setFirestoreLoading(false);
        }
    })

    const placeholderArr = []

    for (let i = 0; i < 6; i++) {
        placeholderArr.push(<PlaceholderCard />);
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
                        {firestoreLoading ? placeholderArr : uniqeCat.map((data) => {
                            return (<CategoryCard item={data} />)
                        })}
                    </div>
                </div>
            </div>
        </>
    );
}
export default Mainpage;