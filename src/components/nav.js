import React, { useState } from 'react';
import logo_img from '../img/logo.svg';
import { Link } from 'react-router-dom';
import firebase from '../firebase';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

const Nav = ({ logged, setLogged }) => {
    const logOut = () => {
        firebase.auth().signOut();
        setLogged(false);
    };

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
            <nav className={navbar ? "active" : ""}>
                <div className="nav">
                    <Link to='/'><h1><img src={logo_img} alt="logo" /></h1></Link>
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
                                <Link to='/create'>
                                    Můj recept
                                </Link>
                            </li>
                            {
                                logged ?
                                    <li>
                                        <Link to='/account'>
                                            Profil
                                </Link>
                                    </li>
                                    : ""
                            }
                        </ul>
                    </div>
                    {logged ? <button onClick={logOut} className="button-nav">Odhlásit se</button> : <Link to='/login' className="button-nav">Přihlásit se</Link>}
                    <input type="checkbox" id="active"></input>
                    <label for="active" className="menu-btn"><FontAwesomeIcon icon={faBars} /></label>
                    <div class="wrapper">
                        <ul>
                            <li>
                                <Link to='/'>
                                    Domů
                            </Link></li>
                            <li>
                                <Link to='/receptar'>
                                    Receptář
                            </Link>
                            </li>
                            <li>
                                <Link to='/create'>
                                    Můj recept
                            </Link>
                            </li>
                            <li>
                                {
                                    logged ?
                                        <li>
                                            <Link to='/account'>
                                                Profil
                                </Link>
                                        </li>
                                        : ""
                                }
                            </li>
                            <li>
                                {logged ? <button onClick={logOut} className="button-nav">Odhlásit se</button> : <Link to='/login' className="button-nav">Přihlásit se</Link>}
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    );
}
export default Nav;