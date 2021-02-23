//Modules
import React, { useEffect, useState } from 'react';
import Fuse from 'fuse.js';

//Components
import BlogCard from '../components/blogcard';
import SearchBar from "../components/searchBar";
import PlaceholderCard from "../components/placeholderCard";

//Firebase
import firebase from '../firebase';

const Receptory = () => {
    const ref = firebase.firestore().collection("recipe");
    //Set document title
    useEffect(() => {
        document.title = `Receptář | Moje kuchařka`;
    })

    //Internal STATE configuration

    const [filterValue, setFilterValue] = useState(false);
    const [activeFilter, setActiveFilter] = useState(false);


    const [firestoreLoading, setFirestoreLoading] = useState(true);

    const [asyncData, setAsyncData] = useState([]);
    const [data, setData] = useState([]);
    console.log("[Data]: ", data);

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
        console.log(filter);
        if (activeFilter) {
            setFilterValue(filter);
            setActiveFilter(false);
        }
        else {
            setFilterValue(filter);
            setActiveFilter(true);
        }
    }




    const getRecipes = async () => {
        const allArr = [];
        const categoryArr = [];
        const allReciper = await ref.get();
        for (const doc of allReciper.docs) {
            allArr.push({
                id: doc.data().id,
                name: doc.data().name,
                artist: doc.data().artist,
                createdAt: doc.data().createdAt,
                cover: doc.data().cover
            });
        }
        setAsyncData(allArr);
        setData(allArr);
        // setAsyncCategory(categoryArr);
    }

    console.log("[asyncData]: ", asyncData);

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


    const placeholderArr = [];
    for (let i = 0; i < 6; i++) {
        placeholderArr.push(<PlaceholderCard />);
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
                        <div className="dropdown">
                            <button className="dropbtn">Snídaně</button>
                            <div className="dropdown-content">
                                <button value="Anglická snídaně" onClick={(e) => filterHandler(e.target.value)}>Anglická</button>
                                <button value="Americká snídaně" onClick={(e) => filterHandler(e.target.value)}>Americká</button>
                                <button value="Kontinentální snídaně" onClick={(e) => filterHandler(e.target.value)}>Kontinentální</button>
                                <button value="Vídeňská snídaně" onClick={(e) => filterHandler(e.target.value)}>Vídeňská</button>
                            </div>
                        </div>

                        <div className="dropdown">
                            <button className="dropbtn" value="Svačina" onClick={(e) => filterHandler(e.target.value)}>Svačina</button>
                        </div>

                        <div className="dropdown">
                            <button className="dropbtn">Předkrm</button>
                            <div className="dropdown-content">
                                <button value="Studené předkrmy" onClick={(e) => filterHandler(e.target.value)}>Studené</button>
                                <button value="Teplé předkrmy" onClick={(e) => filterHandler(e.target.value)}>Teplé</button>
                            </div>
                        </div>

                        <div className="dropdown">
                            <button className="dropbtn">Polévka</button>
                            <div className="dropdown-content">
                                <button value="Slaná polévka" onClick={(e) => filterHandler(e.target.value)}>Slaná</button>
                                <button value="Sladká polévka" onClick={(e) => filterHandler(e.target.value)}>Sladká</button>
                                <button value="Studená polévka" onClick={(e) => filterHandler(e.target.value)}>Studená</button>
                                <button value="Teplá polévka" onClick={(e) => filterHandler(e.target.value)}>Teplá</button>
                                <button value="Čirá polévka" onClick={(e) => filterHandler(e.target.value)}>Čiré</button>
                                <button value="Zahuštěná polévka" onClick={(e) => filterHandler(e.target.value)}>Zahuštěné</button>
                            </div>
                        </div>

                        <div className="dropdown">
                            <button className="dropbtn">Hlavní chod</button>
                            <div className="dropdown-content">
                                <button value="Maso" onClick={(e) => filterHandler(e.target.value)}>Masitá</button>
                                <button value="Ryba" onClick={(e) => filterHandler(e.target.value)}>Rybí</button>
                                <button value="Vegetarián" onClick={(e) => filterHandler(e.target.value)}>Vegetariánské</button>
                            </div>
                        </div>

                        {/* <div class="dropdown">
                            <button class="dropbtn">Večeře</button>
                            <div class="dropdown-content">
                                <button value="David" onClick={(e) => filterHandler(e.target.value)}>Link 1</button>
                                <button value="David" onClick={(e) => filterHandler(e.target.value)}>Link 1</button>
                                <button value="David" onClick={(e) => filterHandler(e.target.value)}>Link 1</button>
                            </div>
                        </div> */}
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
                                            return (<BlogCard data={recipe} key={recipe.id} />)
                                        })
                                        :
                                        asyncData.map((data) => {
                                            return (<BlogCard data={data} key={data.id} />)
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