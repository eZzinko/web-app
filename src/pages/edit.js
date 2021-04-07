import React, { useState, useContext, useEffect, useLayoutEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { v4 as uuid4 } from 'uuid';
import firebase from '../firebase';
import { AuthContext } from '../auth/Auth';
import ReactQuill, { Quill } from 'react-quill';
import quillEmoji from 'quill-emoji';
import 'react-quill/dist/quill.snow.css';

const Edit = () => {
	useLayoutEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	const [currentDoc, setCurrentDoc] = useState([]);
	const backgroundImage = {
		backgroundImage: `url(${currentDoc.cover})`,
	};
	const history = useHistory();
	const ref = firebase.firestore().collection('recipe');

	const { currentUser } = useContext(AuthContext);

	const [artist, setArtist] = useState();
	const [cover, setCover] = useState('');
	const [createdAt, setCreatedAt] = useState(Date.now());
	const [description, setDescription] = useState('');
	const [madePrice, setMadePrice] = useState('');
	const [madeTime, setMadeTime] = useState('');
	// eslint-disable-next-line
	const [main, setMain] = useState(false);
	const [name, setName] = useState('');
	const [category, setCategory] = useState('');
	const [subCategory, setSubCategory] = useState('');
	const [content, setContent] = useState('');
	const [firestoreLoading, setFirestoreLoading] = useState(true);

	const timestamp = new Date(currentDoc.createdAt);
	const humanDate = new Date(timestamp).getDate() + '. ' + (new Date(timestamp + 60).getMonth() + 1) + '. ' + new Date(timestamp).getFullYear();

	function addRecipe(editRecipe) {
		console.log(editRecipe);
		ref
			.doc(currentDoc.id)
			.set(editRecipe)
			.then(() => {
				console.log('Document successfully written!');
			})
			.catch((err) => {
				console.error('Error writing document: ', err);
			});
		history.push('/receptar');
	}

	// Quill
	const { EmojiBlot, ShortNameEmoji, ToolbarEmoji, TextAreaEmoji } = quillEmoji;
	Quill.register(
		{
			'formats/emoji': EmojiBlot,
			'modules/emoji-shortname': ShortNameEmoji,
			'modules/emoji-toolbar': ToolbarEmoji,
			'modules/emoji-textarea': TextAreaEmoji,
		},
		true,
	);

	const modules = {
		toolbar: {
			container: [
				[{ header: [1, 2, 3, 4, 5, 6, false] }],
				[{ font: [] }],
				[{ align: [] }],
				['bold', 'italic', 'underline'],
				[{ list: 'ordered' }, { list: 'bullet' }],
				[{ color: [] }, { background: [] }],
				['emoji'],
			],
		},
		'emoji-toolbar': true,
		'emoji-textarea': true,
		'emoji-shortname': true,
	};

	const formats = [
		'header',
		'font',
		'size',
		'bold',
		'italic',
		'underline',
		'strike',
		'blockquote',
		'list',
		'bullet',
		'indent',
		'align',
		'link',
		'image',
		'background',
		'color',
		'emoji',
	];
	const quillHandleChange = (value) => {
		setContent(value);
		console.log(content);
	};

	useEffect(() => {
		document.title = `Nový recept | Moje kuchařka`;
	});

	const historyLink = history.location.pathname;
	const historySubString = historyLink.substring(6);
	console.log('[History subString]: ', historySubString);

	const getRecipes = async () => {
		let activeData = [];
		console.log('[activeData SET]:', activeData);
		activeData = await firebase.firestore().collection('recipe').doc(historySubString).get();
		console.log('[activeData POS]:', activeData);
		setCurrentDoc(activeData.data());
		setArtist(currentDoc.artist);
		setCover(currentDoc.cover);
		setCreatedAt(currentDoc.createdAt);
		setDescription(currentDoc.description);
		setMadePrice(currentDoc.madePrice);
		setMadeTime(currentDoc.madeTime);
		setMain(currentDoc.main);
		setName(currentDoc.name);
		setCategory(currentDoc.category);
		setSubCategory(currentDoc.subCategory);
		setContent(currentDoc.content);
	};
	console.log(currentDoc);

	//Execute API get request
	useEffect(() => {
		getRecipes();
		// eslint-disable-next-line
	}, []);
	useEffect(() => {
		if (currentDoc.artist != '') {
			setFirestoreLoading(false);
		}
		console.log('Current Doc', currentDoc);
	});

	const [selectRef, setSelectedRef] = useState(null);

	const CATEGORY = [
		{
			name: 'Snídaně',
			subCategory: [
				{
					name: 'Kontinentální snídaně',
				},
				{
					name: 'Anglická snídaně',
				},
				{
					name: 'Vídeňská snídaně',
				},
				{
					name: 'Americká snídaně',
				},
			],
		},
		{
			name: 'Předkrm',
			subCategory: [
				{
					name: 'Studené předkrmy',
				},
				{
					name: 'Teplé předkrmy',
				},
			],
		},
		{
			name: 'Polévka',
			subCategory: [
				{
					name: 'Čirá polévka',
				},
				{
					name: 'Teplá polévka',
				},
				{
					name: 'Zahuštěná polévka',
				},
				{
					name: 'Sladká polévka',
				},
				{
					name: 'Studená polévka',
				},
				{
					name: 'Slaná polévka',
				},
			],
		},
		{
			name: 'Hlavní chod',
			subCategory: [
				{
					name: 'Rybí hlavní chod',
				},
				{
					name: 'Masitý hlavní chod',
				},
				{
					name: 'Vegetariánský hlavní chod',
				},
			],
		},
		{
			name: 'Svačina',
			subCategory: [
				{
					name: 'Rychlá sváča',
				},
			],
		},
		{
			name: 'Večeře',
			subCategory: [
				{
					name: 'Rychlé jídlo',
				},
			],
		},
	];
	const onChangeHander = (e) => {
		setSelectedRef(e.target.value);
		setCategory(e.target.value);
	};
	const subData = CATEGORY.find((value) => value.name == selectRef);
	if (firestoreLoading) {
		return <h1>Načítání</h1>;
	} else {
		return (
			<div className="editPage">
				<div className="cover" style={backgroundImage}>
					<div className="overlay"></div>
					<div className="cover-panel-full">
						<div className="cover-panel">
							<div className="item">
								<input
									type="number"
									className="__heading"
									onChange={(e) => setMadeTime(e.target.value)}
									onLoad={(e) => setMadeTime(e.target.value)}
									placeholder="MadeTime"
									defaultValue={currentDoc.madeTime}
								/>
								min
							</div>
							<div className="item">
								<h3>
									<input
										type="text"
										className="__heading heading"
										onChange={(e) => setName(e.target.value)}
										onLoad={(e) => setName(e.target.value)}
										placeholder="Name"
										defaultValue={currentDoc.name}
									/>
								</h3>
							</div>
							<div className="item">
								<input
									type="number"
									className="__heading"
									onChange={(e) => setMadePrice(e.target.value)}
									onLoad={(e) => setMadePrice(e.target.value)}
									placeholder="MadePrice"
									defaultValue={currentDoc.madePrice}
								/>{' '}
								Kč
							</div>
						</div>
					</div>
				</div>
				<div className="body-align">
					<div className="short-info">
						<span>
							{/* <input type="text" onChange={(e) => setDescription(e.target.value)} placeholder="Description" defaultValue={currentDoc.description} /> */}
							<textarea
								type="text"
								onChange={(e) => setDescription(e.target.value)}
								onLoad={(e) => setDescription(e.target.value)}
								placeholder="Description"
								rows="10"
								defaultValue={currentDoc.description}
							/>
						</span>
					</div>
					<div className="content-box">
						<div className="content">
							<ReactQuill
								onChange={quillHandleChange}
								onLoad={quillHandleChange}
								defaultValue={currentDoc.content || ''}
								theme="snow"
								modules={modules}
								formats={formats}
								placeholder="Přidejte váš úžasný recept"
							/>
						</div>
						<div className="side-bar">
							<input type="text" value={humanDate} placeholder="CreatedAt" disabled className="noStyle" defaultValue={humanDate} />

							<input type="text" disabled value={currentUser.displayName} className="noStyle" defaultValue={currentDoc.artist} />
							<span>
								<select onChange={(e) => onChangeHander(e)} onLoad={(e) => setCategory(e.target.value)} defaultValue={currentDoc.category}>
									{CATEGORY.map((value, key) => {
										return (
											<option value={value.name} key={key}>
												{value.name}
											</option>
										);
									})}
								</select>
							</span>
							<span>
								<select
									onChange={(e) => setSubCategory(e.target.value)}
									onLoad={(e) => setSubCategory(e.target.value)}
									defaultValue={currentDoc.subCategory}
								>
									{subData?.subCategory?.map((item, key) => {
										return (
											<option value={item.name} key={key}>
												{item.name}
											</option>
										);
									})}
								</select>
							</span>
						</div>
					</div>
				</div>
				<button
					onClick={() => {
						console.log(artist);
						// addRecipe({ artist, cover, createdAt, description, id: uuid4(), madePrice, madeTime, main, name, category, subCategory, content });
						addRecipe({ artist, cover, createdAt, description, id: uuid4(), madePrice, madeTime, main, name, category, subCategory, content });
					}}
					className="button-save"
				>
					Uložit
				</button>
			</div>
		);
	}
};
export default Edit;
