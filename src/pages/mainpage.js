//Modules
import React, { useEffect, useState, useLayoutEffect } from 'react';
import { v4 as uuid4 } from 'uuid';
import firebase from '../firebase';
import { Link } from 'react-router-dom';

//Components
import Infocard from '../components/infocard';
import InfoLargeCard from '../components/infolargecard';
import CategoryCard from '../components/categoryCard';
import PlaceholderCard from '../components/placeholderCard';

const Mainpage = () => {
	//Set document title
	useEffect(() => {
		document.title = `Moje kuchařka`;
	});

	useLayoutEffect(() => {
		window.scrollTo(0, 0);
	});

	const ref = firebase.firestore().collection('recipe');

	const [firestoreLoading, setFirestoreLoading] = useState(true);

	const [asyncData, setAsyncData] = useState([]);
	const [asyncCategory, setAsyncCategory] = useState([]);
	// eslint-disable-next-line
	const [asyncDataMain, setAsyncDataMain] = useState([
		{
			name: '',
		},
	]);

	const getRecipes = async () => {
		const allArr = [];
		const getMain = [];
		const categoryArr = [];
		const allReciper = await ref.get();
		for (const doc of allReciper.docs) {
			allArr.push(doc.data());
			categoryArr.push(doc.data().category);
		}
		setAsyncData(allArr);
		setAsyncCategory(categoryArr);

		allArr.filter((data) => {
			if (data.main === true) {
				getMain.push(data);
			}
			return '';
		});
		setAsyncDataMain(getMain);
	};
	const uniqeCat = [...new Set(asyncCategory)];

	//Execute API get request
	useEffect(() => {
		getRecipes();
		// eslint-disable-next-line
	}, []);

	// eslint-disable-next-line
	useEffect(() => {
		if (asyncData.length > 0) {
			setFirestoreLoading(false);
		}
	});

	const placeholderArr = [];

	for (let i = 0; i < 6; i++) {
		placeholderArr.push(<PlaceholderCard key={i} />);
	}
	return (
		<>
			<div className="header">
				<Infocard />
			</div>
			<div className="body-align">
				<div className="advice">
					<h2>Tip dnešního dne</h2>
					<div className="row"></div>
					<div className="mealofday">
						<div className="card">
							{firestoreLoading ? (
								<>
									<div className="info-card large">
										<div className="info-card-heading placeholder">
											<h2>Title</h2>
										</div>
										<div className="info-card-content">
											<div className="link">
												<div className="icon">
													<svg
														aria-hidden="true"
														focusable="false"
														data-prefix="fal"
														data-icon="clock"
														role="img"
														xmlns="http://www.w3.org/2000/svg"
														viewBox="0 0 512 512"
														className="svg-inline--fa fa-clock fa-w-16 fa-7x"
													>
														<path
															fill="currentColor"
															d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm216 248c0 118.7-96.1 216-216 216-118.7 0-216-96.1-216-216 0-118.7 96.1-216 216-216 118.7 0 216 96.1 216 216zm-148.9 88.3l-81.2-59c-3.1-2.3-4.9-5.9-4.9-9.7V116c0-6.6 5.4-12 12-12h14c6.6 0 12 5.4 12 12v146.3l70.5 51.3c5.4 3.9 6.5 11.4 2.6 16.8l-8.2 11.3c-3.9 5.3-11.4 6.5-16.8 2.6z"
															className=""
														></path>
													</svg>
												</div>
												<div className="content">
													<h4>Doba přípravy</h4>
													<h5 className="placeholder">&nbsp;</h5>
												</div>
											</div>
											<div className="link">
												<div className="icon">
													<svg
														aria-hidden="true"
														focusable="false"
														data-prefix="fal"
														data-icon="money-bill-alt"
														role="img"
														xmlns="http://www.w3.org/2000/svg"
														viewBox="0 0 640 512"
														className="svg-inline--fa fa-money-bill-alt fa-w-20 fa-7x"
													>
														<path
															fill="currentColor"
															d="M608 64H32C14.3 64 0 78.3 0 96v320c0 17.7 14.3 32 32 32h576c17.7 0 32-14.3 32-32V96c0-17.7-14.3-32-32-32zM32 96h64c0 35.3-28.7 64-64 64zm0 320v-64c35.3 0 64 28.7 64 64zm576 0h-64c0-35.3 28.7-64 64-64zm0-96c-52.9 0-96 43.1-96 96H128c0-52.9-43.1-96-96-96V192c52.9 0 96-43.1 96-96h384c0 52.9 43.1 96 96 96zm0-160c-35.3 0-64-28.7-64-64h64zm-288-32c-61.9 0-112 57.3-112 128s50.1 128 112 128c61.8 0 112-57.3 112-128s-50.1-128-112-128zm0 224c-44.1 0-80-43.1-80-96s35.9-96 80-96 80 43.1 80 96-35.9 96-80 96zm32-63.9h-16v-88c0-4.4-3.6-8-8-8h-13.7c-4.7 0-9.4 1.4-13.3 4l-15.3 10.2c-3.7 2.5-4.6 7.4-2.2 11.1l8.9 13.3c2.5 3.7 7.4 4.6 11.1 2.2l.5-.3V288h-16c-4.4 0-8 3.6-8 8v16c0 4.4 3.6 8 8 8h64c4.4 0 8-3.6 8-8v-16c0-4.4-3.6-8-8-7.9z"
															className=""
														></path>
													</svg>
												</div>
												<div className="content">
													<h4>Cena přípravy</h4>
													<h5 className="placeholder">&nbsp;</h5>
												</div>
											</div>
										</div>
										<div className="info-card-footer">
											<span>
												<Link to={`/receptar/`}> Přečíst více</Link>
											</span>
										</div>
									</div>
									<div className="image-box placeholder"></div>
								</>
							) : (
								asyncData.map((data) => {
									if (data.tipOfDay === true) {
										return <InfoLargeCard asyncData={data} key={uuid4} />;
									} else {
										return '';
									}
								})
							)}
						</div>
					</div>
				</div>
				<div className="category">
					<h2>Kategorie</h2>
					<div className="grid">
						{firestoreLoading
							? placeholderArr
							: uniqeCat.map((data) => {
									return <CategoryCard item={data} key={data} />;
							  })}
					</div>
				</div>
			</div>
		</>
	);
};
export default Mainpage;
