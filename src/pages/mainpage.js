//Modules
import React, { useEffect, useState } from 'react';
import { v4 as uuid4 } from "uuid";
import firebase from '../firebase';

//Components
import Infocard from '../components/infocard';
import InfoLargeCard from "../components/infolargecard";
import CategoryCard from '../components/categoryCard';
import PlaceholderCard from '../components/placeholderCard';

const Mainpage = () => {

    //Set document title
    useEffect(() => {
        document.title = `Moje kuchařka`;
    })

    const ref = firebase.firestore().collection("recipe");

    const [firestoreLoading, setFirestoreLoading] = useState(true);

    const [asyncData, setAsyncData] = useState([]);
    const [asyncCategory, setAsyncCategory] = useState([]);
    // eslint-disable-next-line
    const [asyncDataMain, setAsyncDataMain] = useState([{
        name: ""
    }]);

    const getRecipes = async () => {
        const allArr = [];
        const getMain = [];
        const categoryArr = [];
        const allReciper = await ref.get();
        for (const doc of allReciper.docs) {
            allArr.push(doc.data());
            categoryArr.push(doc.data().category);
        }
        setAsyncData(allArr);
        setAsyncCategory(categoryArr);

        allArr.filter((data) => {
            if (data.main === true) {
                getMain.push(data);
            }
            return ("");
        });
        setAsyncDataMain(getMain);
    }
    const uniqeCat = [...new Set(asyncCategory)];


    //Execute API get request
    useEffect(() => {
        getRecipes();
        // eslint-disable-next-line
    }, []);

    // eslint-disable-next-line 
    useEffect(() => {
        if (asyncData.length > 0) {
            // console.log("Undefined");
            setFirestoreLoading(false);
        }
    })

    const placeholderArr = []

    for (let i = 0; i < 6; i++) {
        placeholderArr.push(<PlaceholderCard key={i} />);
    }
    return (
        <>
            <div className="header">
                <Infocard />
            </div>
            <div className="body-align">

                <div className="advice">
                    <h2>Tip dnešního dne</h2>
                    <div className="row">
                    </div>
                    <div className="mealofday">
                        <div className="card">
                            {
                                firestoreLoading
                                    ?
                                    <PlaceholderCard />
                                    :
                                    asyncData.map((data) => {

                                        if (data.tipOfDay === true) {
                                            return (<InfoLargeCard asyncData={data} key={uuid4} />)
                                        }
                                        else {
                                            return ("");
                                        }
                                    })

                            }
                        </div>
                        <div className="image-box"></div>
                    </div>
                </div>
                <div className="category">
                    <h2>Kategorie</h2>
                    <div className="row">
                        {firestoreLoading ? placeholderArr : uniqeCat.map((data) => {
                            return (<CategoryCard item={data} key={data} />)
                        })}
                    </div>
                </div>
            </div>
        </>
    );
}
export default Mainpage;