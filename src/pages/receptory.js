import React from 'react';
import Infocard from '../components/infocard';
import BlogCard from '../components/blogcard';

const Receptory = ({ recipes }) => {
    return (
        <>
            <div className="header">
                <div className="header-box">
                    <div className="img-box">
                    </div>
                    <div className="card-box">
                        <Infocard />
                    </div>
                </div>
            </div>
            <div className="body-align">

                <div className="blog-part">
                    <h2>Najděte si, na co máte chuť</h2>
                    <div className="search-bar">
                        <input type="search"></input>
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
                            <BlogCard recipe={recipe} />
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}
export default Receptory;