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

        setCloseRef(!closeRef);
        document.body.style.overflow = "visible";
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
    // Scroll effect---¨
    const [navOpen, setNavOpen] = useState(false);
    const navOpenHandler = () => {
        if (navOpen) {

            document.body.style.overflow = "hidden";
            setNavOpen(false);
        }
        else {
            document.body.style.overflow = "visible";
            document.body.style.overflowY = "overlay";
            setNavOpen(true);
        }
    }
    const [closeRef, setCloseRef] = useState(false);
    const closeRefHandle = () => {
        setCloseRef(!closeRef);
        document.body.style.overflow = "visible";
    }

    return (
        <>
            <nav className={navbar ? "active" : ""}>
                <div className={navOpen ? "nav nav-fixed" : "nav"}>
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
                    <input type="checkbox" id="active" onClick={navOpenHandler} checked={closeRef} onChange={closeRefHandle}></input>
                    <label htmlFor="active" className="menu-btn"><FontAwesomeIcon icon={faBars} /></label>
                    <div className="wrapper">
                        <ul>
                            <li>
                                <Link to='/' onClick={closeRefHandle}>
                                    Domů
                            </Link></li>
                            <li>
                                <Link to='/receptar' onClick={closeRefHandle}>
                                    Receptář
                            </Link>
                            </li>
                            <li>
                                <Link to='/create' onClick={closeRefHandle}>
                                    Můj recept
                            </Link>
                            </li>
                            <li>
                                {
                                    logged ?

                                        <Link to='/account' onClick={closeRefHandle}>
                                            Profil
                                        </Link>

                                        : ""
                                }
                            </li>
                            <li>
                                {logged ?
                                    <Link to='/' onClick={logOut}>
                                        Odhlásit se
                                    </Link>
                                    :
                                    <Link to='/login' >
                                        Přihlásit se
                                    </Link>
                                }
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    );
}
export default Nav;