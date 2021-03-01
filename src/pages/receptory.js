//Modules
import React, { useEffect, useState } from 'react';
import Fuse from 'fuse.js';
// import { v4 as uuid4 } from "uuid";

//Components
import BlogCard from '../components/blogcard';
import SearchBar from "../components/searchBar";
import PlaceholderCard from "../components/placeholderCard";

//Firebase
import firebase from '../firebase';

const Receptory = ({ setAsyncDataActive }) => {

    //Set document title
    useEffect(() => {
        document.title = `Receptář | Moje kuchařka`;
    })

    //Internal STATE configuration
    const ref = firebase.firestore().collection("recipe");

    const [filterValue, setFilterValue] = useState(false);
    const [activeFilter, setActiveFilter] = useState();

    const [firestoreLoading, setFirestoreLoading] = useState(true);

    const [asyncData, setAsyncData] = useState([]);
    const [data, setData] = useState([]);
    const [asyncCategory, setAsyncCategory] = useState([]);

    //Fuse module SEARCH
    //User input
    const searchHandler = (pattern) => {

        // Clear filter if no data to search
        if (!pattern) {
            setAsyncData(data);
            return;
        }

        //Select fields to search from
        const fuse = new Fuse(asyncData, {
            keys: ["artist", "category", "name", "subCategory"],
        });

        const result = fuse.search(pattern);
        const matches = [];

        //Filter data compared to result
        if (!result.length) {
            setAsyncData(data);
        } else {
            result.forEach(({ item }) => {
                matches.push(item);
            });
            setAsyncData(matches);
        }
    }

    //Filter data from DropDown select
    const filterHandler = (filter) => {
        if (filter === activeFilter) {
            setFilterValue("");
        }
        else {
            setFilterValue(filter);
            setActiveFilter(filter);
        }
    }




    const getRecipes = async () => {
        const allArr = [];
        const categoryData = [];
        const allReciper = await ref.get();
        for (const doc of allReciper.docs) {
            allArr.push({
                id: doc.data().id,
                name: doc.data().name,
                artist: doc.data().artist,
                createdAt: doc.data().createdAt,
                cover: doc.data().cover,
                category: doc.data().category,
                subCategory: doc.data().subCategory
            });
            categoryData.push(doc.data().category);
        }
        setAsyncData(allArr);
        setData(allArr);
        setAsyncCategory(categoryData);
        // setAsyncCategory(categoryArr);
    }
    const uniqeCat = [...new Set(asyncCategory)];

    // console.log("[asyncData]: ", asyncData);

    //Execute API get request
    useEffect(() => {
        getRecipes();
        // eslint-disable-next-line
    }, []);

    // eslint-disable-next-line 
    useEffect(() => {
        if (asyncData.length > 0) {
            setFirestoreLoading(false);
        }
    })


    const placeholderArr = [];
    for (let i = 0; i < 6; i++) {
        placeholderArr.push(<PlaceholderCard key={i} />);
    }





    return (
        <>
            <div className="header">
                <div className="header-box">
                    <div className="img-box">
                    </div>
                    <div className="card-box">

                    </div>
                </div>
            </div>
            <div className="body-align">

                <div className="blog-part">
                    <h2>Najděte si, na co máte chuť</h2>
                    <SearchBar placeholder="Na co máte chuť" onChange={(e) => searchHandler(e.target.value)} />
                    <div className="filter-bar">
                        {
                            uniqeCat.map((data) => {
                                return (
                                    <div className="dropdown">
                                        <button className="dropbtn">{data}</button>
                                        <div className="dropdown-content">
                                            {
                                                asyncData.map((asyncDataFor) => {
                                                    if (asyncDataFor.category === data) {
                                                        return (
                                                            <button value={asyncDataFor.subCategory} key={asyncDataFor.id} onClick={(e) => filterHandler(e.target.value)}>{asyncDataFor.subCategory}</button>
                                                        );
                                                    }
                                                    else {
                                                        return ("");
                                                    }

                                                })
                                            }
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <div className="row">
                        {
                            firestoreLoading
                                ?
                                placeholderArr
                                :
                                (
                                    filterValue
                                        ?
                                        asyncData.filter(data => data.subCategory === filterValue).map((recipe) => {
                                            return (<BlogCard data={recipe} key={recipe.id} setAsyncDataActive={setAsyncDataActive} />)
                                        })
                                        :
                                        asyncData.map((data) => {
                                            return (<BlogCard data={data} key={data.id} setAsyncDataActive={setAsyncDataActive} />)
                                        })
                                )
                        }
                    </div>
                </div>
            </div>
        </>
    );
}
export default Receptory;