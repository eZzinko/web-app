//Modules
import React, { useContext, useState, useEffect, useLayoutEffect } from 'react';

//FIrebase
import { AuthContext } from '../auth/Auth';
import firebase from '../firebase';

import BlogCard from '../components/blogcard';
import PlaceholderCard from '../components/placeholderCard';

const Profile = () => {
	const { currentUser } = useContext(AuthContext);
	const [userName, setUserName] = useState('');
	const user = firebase.auth().currentUser;

	const setUserData = () => {
		user.updateProfile({
			displayName: userName,
		});
		window.alert('Jméno bylo úspěšně změněno!');
		getRecipes();
	};

	useEffect(() => {
		document.title = `${currentUser.displayName} | Moje kuchařka`;
	});
	useLayoutEffect(() => {
		window.scrollTo(0, 0);
	});

	const ref = firebase.firestore().collection('recipe');

	const [firestoreLoading, setFirestoreLoading] = useState(true);

	const [asyncData, setAsyncData] = useState([]);

	const getRecipes = async () => {
		const allArr = [];
		const allReciper = await ref.get();
		for (const doc of allReciper.docs) {
			if (doc.data().artist === user.displayName) {
				allArr.push({
					id: doc.data().id,
					name: doc.data().name,
					artist: doc.data().artist,
					createdAt: doc.data().createdAt,
					cover: doc.data().cover,
					category: doc.data().category,
					subCategory: doc.data().subCategory,
				});
			}
		}
		setAsyncData(allArr);
	};
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

	console.log(asyncData);
	const placeholderArr = [];
	for (let i = 0; i < 6; i++) {
		// eslint-disable-next-line
		placeholderArr.push(<PlaceholderCard key={i} style={true} />);
	}
	return (
		<>
			<div className="login-page">
				<div className="login-card">
					<div className="login-card-header">
						<h2>Informace o profilu</h2>
					</div>
					<div className="login-card-body">
						<label htmlFor="name">Jméno a příjmení</label>
						<input
							id="name"
							type="test"
							defaultValue={currentUser.displayName}
							onChange={(e) => setUserName(e.target.value)}
							placeholder="Jméno a příjmení"
						/>
						<label htmlFor="email">Email</label>
						<input id="email" type="email" defaultValue={currentUser.email} placeholder="example@example.com" disabled />
					</div>
					<div className="login-card-footer">
						<button onClick={setUserData}>Uložit</button>
					</div>
				</div>
			</div>
			<div className="body-align">
				<h2>Články uživatele</h2>
				<div className="grid">
					{firestoreLoading
						? placeholderArr
						: asyncData?.map((item, key) => {
								return <BlogCard data={item} key={item.id} />;
						  })}
				</div>
			</div>
		</>
	);
};
export default Profile;
