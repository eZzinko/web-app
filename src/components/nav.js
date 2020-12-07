import React, { useState, useEffect } from 'react';
import logo_img from '../img/logo.svg';




const Nav = () => {
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
    return (
        <>
            <nav className={navbar ? 'navbar active' : 'navbar'}>
                <div className="nav-bar">
                    <h1><img src={logo_img} alt="logo" /></h1>
                    <div className="nav-items">
                        <ul>
                            <li>
                                <a href="#">Domů</a>
                            </li>
                            <li>
                                <a href="#">Receptář</a>
                            </li>
                            <li>
                                <a href="#">Blog</a>
                            </li>
                            <li>
                                <a href="#">Můj recept</a>
                            </li>
                        </ul>
                    </div>
                    <a href="#" className="button">Přihlásit se</a>
                </div>
            </nav>
        </>
    );
}
export default Nav;