import React from 'react';
import { Link } from 'react-router-dom';
import firebase from '../firebase';

const Footer = ({ logged, setLogged }) => {
	const logOut = () => {
		firebase.auth().signOut();
		setLogged(false);
		alert('Odhlášení proběhlo úspěšně');

		document.body.style.overflow = 'visible';
	};
	return (
		<>
			<footer>
				<div className="footer-container">
					<div className="column">
						<h5>Navigace</h5>
						<ul>
							<li>
								<Link to={'/'}>Domů</Link>
							</li>
							<li>
								<Link to={'/receptar'}>Receptář</Link>
							</li>
							<li>
								<Link to={'/create'}>Můj recept</Link>
							</li>
						</ul>
					</div>
					<div className="column"></div>
					<div className="column"></div>
					<div className="column">
						<h5>Uživatel</h5>
						<ul>
							{logged ? (
								<>
									<li>
										<Link to={'/account'}>Profil</Link>
									</li>
									<li onClick={logOut} style={{ textDecoration: 'underline', cursor: 'pointer' }}>
										Odhlásit se
									</li>
								</>
							) : (
								<li>
									<Link to={'/login'}>Přihlásit se</Link>
								</li>
							)}
						</ul>
					</div>
				</div>
				<div className="copy">
					<span>Copyright &copy; 2020 - DEV&amp;Design Daniel Neuman</span>
				</div>
			</footer>
		</>
	);
};
export default Footer;
