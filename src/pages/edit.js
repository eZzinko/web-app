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
	useEffect(() => {
		document.title = `Upravit recept | Moje kuchařka`;
	});

	const history = useHistory();
	const ref = firebase.firestore().collection('recipe');

	const { currentUser } = useContext(AuthContext);
	const [artist] = useState(currentUser.displayName); //Set by current logged user
	const [cover, setCover] = useState('');
	const [createdAt, setCreatedAt] = useState(Date.now()); //Set by current time
	const [description, setDescription] = useState('');
	const [madePrice, setMadePrice] = useState('');
	const [madeTime, setMadeTime] = useState('');
	const [main, setMain] = useState(false); //Default main is disable - must be done manualy
	const [tipOfDay, setTipOfDay] = useState(false);
	const [name, setName] = useState('');
	const [category, setCategory] = useState('');
	const [subCategory, setSubCategory] = useState('');
	const [id, setId] = useState('');
	const [content, setContent] = useState(null); //Set by Quill

	function addRecipe(editRecipe) {
		ref
			.doc(id)
			.update({
				artist: artist,
				cover: cover,
				createdAt: createdAt,
				description: description,
				madePrice: madePrice,
				madeTime: madeTime,
				main: main,
				tipOfDay: tipOfDay,
				name: name,
				category: category,
				subCategory,
				content: content,
			})
			.then(() => {
				alert('Data byla úspěšně aktualizována');
			})
			.catch((err) => {
				console.error('Error writing document: ', err);
			});
		history.push('/receptar');
	}

	const historyLink = history.location.pathname;
	const historySubString = historyLink.substring(6);

	const backgroundImage = {
		backgroundImage: `url(${cover})`,
	};

	const timestamp = new Date();
	const humanDate = new Date(timestamp).getDate() + '. ' + (new Date(timestamp + 60).getMonth() + 1) + '. ' + new Date(timestamp).getFullYear();

	const getRecipes = async () => {
		let activeData = [];
		// eslint-disable-next-line
		activeData = await firebase
			.firestore()
			.collection('recipe')
			.doc(historySubString)
			.get()
			.then((doc) => {
				if (doc.exists) {
					setCurrentData(doc.data());
				} else {
					alert('Data nebyla nalezena');
				}
			})
			.catch((err) => {
				alert('Vyskytla se chyba: ', err);
			});
	};

	const setCurrentData = (data) => {
		setCover(data.cover);
		setCreatedAt(data.createdAt);
		setDescription(data.description);
		setMadePrice(data.madePrice);
		setMadeTime(data.madeTime);
		setMain(data.main || false);
		setTipOfDay(data.tipOfDay || false);
		setName(data.name);
		setCategory(data.category);
		setSubCategory(data.subCategory);
		setId(data.id);
		setContent(data.content || '');
	};
	//Execute API get request
	useEffect(() => {
		getRecipes();
		// eslint-disable-next-line
	}, []);

	const [selectRef, setSelectedRef] = useState(null);

	//Quill
	//Quill emoji setup
	const { EmojiBlot, ShortNameEmoji, ToolbarEmoji, TextAreaEmoji } = quillEmoji;

	//Write emoji to subscription of Quill
	Quill.register(
		{
			'formats/emoji': EmojiBlot,
			'modules/emoji-shortname': ShortNameEmoji,
			'modules/emoji-toolbar': ToolbarEmoji,
			'modules/emoji-textarea': TextAreaEmoji,
		},
		true,
	);

	//Quill modules - set what is displayed
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

	//Quill formats - set what is working
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

	//Change state content based on user input
	const quillHandleChange = (value) => {
		setContent(value);
	};

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
	};
	const subData = CATEGORY.find((value) => value.name === selectRef);
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
								defaultValue={madeTime}
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
									defaultValue={name}
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
								defaultValue={madePrice}
							/>{' '}
							Kč
						</div>
					</div>
				</div>
			</div>
			<div className="body-align">
				<div className="short-info">
					<span>
						<textarea
							type="text"
							onChange={(e) => setDescription(e.target.value)}
							onLoad={(e) => setDescription(e.target.value)}
							placeholder="Description"
							rows="10"
							defaultValue={description}
						/>
					</span>
				</div>
				<div className="content-box">
					<div className="content">
						<ReactQuill
							onChange={quillHandleChange}
							onLoad={quillHandleChange}
							value={content}
							theme="snow"
							modules={modules}
							formats={formats}
							placeholder="Přidejte váš úžasný recept"
						/>
					</div>
					<div className="side-bar">
						<input type="text" value={humanDate} placeholder="CreatedAt" disabled className="noStyle" defaultValue={humanDate} />

						<input type="text" disabled value={currentUser.displayName} className="noStyle" defaultValue={artist} />
						<span>
							<select onChange={(e) => onChangeHander(e)} onLoad={(e) => setCategory(e.target.value)} defaultValue={category}>
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
							<select onChange={(e) => setSubCategory(e.target.value)} onLoad={(e) => setSubCategory(e.target.value)} defaultValue={subCategory}>
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
					addRecipe({ artist, cover, createdAt, description, id: uuid4(), madePrice, madeTime, main, name, category, subCategory, content });
				}}
				className="button-save"
			>
				Uložit
			</button>
		</div>
	);
};
export default Edit;
