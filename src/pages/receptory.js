import React from 'react';
import BlogCard from '../components/blogcard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const Receptory = ({ recipes, setRecipe }) => {
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
                    <div className="search-bar">
                        <input type="search"></input>
                        <FontAwesomeIcon icon={faSearch} />
                    </div>
                    <div className="filter-bar">
                        <div class="dropdown">
                            <button class="dropbtn">Dropdown</button>
                            <div class="dropdown-content">
                                <a href="/">Link 1</a>
                                <a href="/">Link 2</a>
                                <a href="/">Link 3</a>
                            </div>
                        </div>

                        <div class="dropdown">
                            <button class="dropbtn">Dropdown</button>
                            <div class="dropdown-content">
                                <a href="/">Link 1</a>
                                <a href="/">Link 2</a>
                                <a href="/">Link 3</a>
                            </div>
                        </div>

                        <div class="dropdown">
                            <button class="dropbtn">Dropdown</button>
                            <div class="dropdown-content">
                                <a href="/">Link 1</a>
                                <a href="/">Link 2</a>
                                <a href="/">Link 3</a>
                            </div>
                        </div>

                        <div class="dropdown">
                            <button class="dropbtn">Dropdown</button>
                            <div class="dropdown-content">
                                <a href="/">Link 1</a>
                                <a href="/">Link 2</a>
                                <a href="/">Link 3</a>
                            </div>
                        </div>

                        <div class="dropdown">
                            <button class="dropbtn">Dropdown</button>
                            <div class="dropdown-content">
                                <a href="/">Link 1</a>
                                <a href="/">Link 2</a>
                                <a href="/">Link 3</a>
                            </div>
                        </div>

                        <div class="dropdown">
                            <button class="dropbtn">Dropdown</button>
                            <div class="dropdown-content">
                                <a href="/">Link 1</a>
                                <a href="/">Link 2</a>
                                <a href="/">Link 3</a>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        {recipes.map((recipe) => (
                            <BlogCard recipe={recipe} setRecipe={setRecipe} recipes={recipes} id={recipe.id} />
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}
export default Receptory;