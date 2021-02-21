import React, { useEffect, useState } from 'react';
import BlogCard from '../components/blogcard';
import SearchBar from "../components/searchBar";
import Fuse from 'fuse.js';

const Receptory = ({ recipes, setRecipe }) => {
    const [data, setData] = useState(recipes);
    const [filterValue, setFilterValue] = useState(false);
    const [activeFilter, setActiveFilter] = useState(false);

    const searchHandler = (pattern) => {
        if (!pattern) {
            setData(recipes);
            return;
        }

        const fuse = new Fuse(data, {
            keys: ["artist", "category", "name", "subCategory"],
        });
        const result = fuse.search(pattern);
        const matches = [];
        if (!result.length) {
            setData([]);
        } else {
            result.forEach(({ item }) => {
                matches.push(item);
            });
            setData(matches);
        }
    }

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

    useEffect(() => {
        document.title = `Receptář | Moje kuchařka`;
    })

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
                        {filterValue ? data.filter(person => person.subCategory === filterValue).map((recipe) => (
                            <BlogCard recipe={recipe} setRecipe={setRecipe} recipes={recipes} id={recipe.id} key={recipe.id} />
                        )) : data.map((recipe) => (
                            <BlogCard recipe={recipe} setRecipe={setRecipe} recipes={recipes} id={recipe.id} key={recipe.id} />
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}
export default Receptory;