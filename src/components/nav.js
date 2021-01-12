import React, { useState } from 'react';
import logo_img from '../img/logo.svg';
import { Link } from 'react-router-dom';

const Nav = () => {
    // Scroll effect
    const [navbar, setNavbar] = useState(false);
    const changeBackground = () => {
        if (window.scrollY >= 20) {
            setNavbar(true);
        }
        else {
            setNavbar(false);
        }
    }

    window.addEventListener('scroll', changeBackground);
    // Scroll effect---
    return (
        <>
            <nav className={navbar ? 'navbar active' : 'navbar'}>
                <div className="nav-bar">
                    <h1><img src={logo_img} alt="logo" /></h1>
                    <div className="nav-items">
                        <ul>

                            <li>
                                <Link to='/'>
                                    Domů
                                </Link>
                            </li>

                            <li>
                                <Link to='/receptar'>
                                    Receptář
                                </Link>
                            </li>


                            <li>
                                <Link to='/'>
                                    Blog
                                </Link>
                            </li>


                            <li>
                                <Link to='/create'>
                                    Můj recept
                                </Link>
                            </li>

                        </ul>
                    </div>
                    <a href="facebook.com" className="button">Přihlásit se</a>
                </div>
            </nav>
        </>
    );
}
export default Nav;