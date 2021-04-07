import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';
import firebase from '../firebase';
// import PlaceholderCard from './placeholderCard';
import { Link } from 'react-router-dom';

const Infocard = ({ asyncDataMain }) => {
	const [mainData, setMainData] = useState([]);
	const [activeMain, setActiveMain] = useState([]);
	const [firestoreLoading, setFirestoreLoading] = useState(true);

	const [asyncData, setAsyncData] = useState([]);

	console.log('[activeMain]: ', activeMain);

	const displayImgHandler = (e) => {
		// setActiveData(asyncDataMain[asyncDataMain.findIndex(x => x.id === e.target.dataset.id)]);
		console.log('[Dataset ID]: ', e.target.dataset.id);
		console.log('[Dataset clicked ID]: ', mainData[mainData.findIndex((x) => x.id === e.target.dataset.id)]);
		setActiveMain(mainData[mainData.findIndex((x) => x.id === e.target.dataset.id)]);
	};

	const ref = firebase.firestore().collection('recipe');

	const getRecipes = async () => {
		const allArr = [];
		const getMain = [];

		const allReciper = await ref.get();
		for (const doc of allReciper.docs) {
			allArr.push(doc.data());
		}
		setAsyncData(allArr);
		console.log('[all Data]: ', allArr);

		allArr.filter((data) => {
			if (data.main === true) {
				getMain.push(data);
			}
			return '';
		});
		setMainData(getMain);
		setActiveMain(getMain[0]);
		console.log('[Main Data]: ', getMain);
	};

	//Execute API get request
	useEffect(() => {
		getRecipes();
		// eslint-disable-next-line
	}, []);

	// eslint-disable-next-line
	useEffect(() => {
		if (asyncData.length > 0) {
			// console.log("Undefined");
			setFirestoreLoading(false);
		}
	});

	const backgroundImage = {
		backgroundImage: `url(${activeMain.cover})`,
	};

	return (
		<div className="header-box">
			<div className="img-box" style={backgroundImage}>
				{/* <div className="img-box" > */}
			</div>
			{firestoreLoading ? (
				<div className="card-box">
					<div className="info-card">
						<div className="heading">
							<h2 className="placeholder">&nbsp;</h2>
						</div>
						<div className="info-card-footer">
							<span>
								<Link to={'/receptar'}>
									<div>
										<FontAwesomeIcon icon={faExternalLinkAlt} />
										Přečíst více
									</div>
								</Link>
							</span>
							<div className="buttons"></div>
						</div>
					</div>
				</div>
			) : (
				<div className="card-box">
					<div className="info-card">
						<div className="heading">
							<h2>{activeMain.name}</h2>
						</div>
						<div className="info-card-footer">
							<span>
								<Link to={`/receptar/${activeMain.id}`}>
									<div>
										<FontAwesomeIcon icon={faExternalLinkAlt} />
										Přečíst více
									</div>
								</Link>
							</span>
							<div className="buttons">
								{mainData.map((image) => (
									// <button className={image.id === asyncDataMain.id ? "nextImg active" : "nextImg"} onClick={displayImgHandler} data-id={image.id}></button>
									<button
										key={image.id}
										onClick={displayImgHandler}
										data-id={image.id}
										className={image.id === activeMain.id ? 'nextImg active' : 'nextImg'}
									></button>
								))}
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};
export default Infocard;
