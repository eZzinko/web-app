//Modules
import React, { useState, useContext, useEffect, useLayoutEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { v4 as uuid4 } from 'uuid';

//Firebase with Authentification
import firebase, { storage } from '../firebase';
import { AuthContext } from '../auth/Auth';

//React Quill module
import ReactQuill, { Quill } from 'react-quill';
import quillEmoji from 'quill-emoji';
import 'react-quill/dist/quill.snow.css';

const Create = () => {
	//Set document title
	useEffect(() => {
		document.title = `Nový recept | Moje kuchařka`;
	});
	useLayoutEffect(() => {
		window.scrollTo(0, 0);
	}, []);
	//React-router-dom history to change router link
	const history = useHistory();

	//Firebase initialization for Firestore collection
	const ref = firebase.firestore().collection('recipe');

	//Firebase userState
	const { currentUser } = useContext(AuthContext);

	//Firebase collection document states
	// eslint-disable-next-line
	const [artist, setArtist] = useState(currentUser.displayName); //Set by current logged user
	// eslint-disable-next-line
	const [cover, setCover] = useState('');
	// eslint-disable-next-line
	const [createdAt, setCreatedAt] = useState(Date.now()); //Set by current time
	const [description, setDescription] = useState('');
	const [madePrice, setMadePrice] = useState('');
	const [madeTime, setMadeTime] = useState('');
	// eslint-disable-next-line
	const [main, setMain] = useState(false); //Default main is disable - must be done manualy
	// eslint-disable-next-line
	const [tipOfDay, setTipOfDay] = useState(false);
	const [name, setName] = useState('');
	const [category, setCategory] = useState('');
	const [subCategory, setSubCategory] = useState('');
	const [content, setContent] = useState(null); //Set by Quill

	const backgroundImage = {
		backgroundImage: `url(${cover})`,
	};

	//Open Firestore connection and write document
	function addRecipe(newRecipe) {
		alert('Proběhlo uložení receptu');
		ref
			.doc(newRecipe.id)
			.set(newRecipe)
			.then(() => {
				alert('Recept byl uložen');
			})
			.catch((err) => {
				console.error('[Add recipe error]: ', err);
				alert('Při ukládání došlo k chybě: ', err);
			});
		history.push('/receptar'); //After write change router
	}
	const timestamp = new Date();
	const humanDate = new Date(timestamp).getDate() + '. ' + (new Date(timestamp + 60).getMonth() + 1) + '. ' + new Date(timestamp).getFullYear();

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
					name: 'Salát',
				},
				{
					name: 'Ryba',
				},
			],
		},
	];
	const onChangeHander = (e) => {
		setSelectedRef(e.target.value);
		setCategory(e.target.value);
	};

	const subData = CATEGORY.find((value) => value.name === selectRef);

	const [imageAsFile, setImageAsFile] = useState('');

	const handleImageAsFile = (e) => {
		const image = e.target.files[0];
		setImageAsFile(image);
	};

	const handleFirebaseUpload = async (e) => {
		e.preventDefault();
		if (imageAsFile === '') {
			alert(`Není podporovaný formát, obrázek je typu ${typeof imageAsFile}`);
		} else {
			await storage
				.ref(`/images/${imageAsFile.name}`)
				.put(imageAsFile)
				.then((snapshot) => {
					alert('Obrázek byl úspěně nahrán');
				});
		}
	};
	const handleFirebaseDownload = async () => {
		await storage
			.ref()
			.child(`/images/${imageAsFile.name}`)
			.getDownloadURL()
			.then((url) => {
				alert('Obrázek byl úspěšně nastaven');
				setCover(url);
			});
	};

	return (
		<div className="editPage">
			<div className="cover" style={backgroundImage}>
				<div className="overlay"></div>
				<h2>
					<form onSubmit={handleFirebaseUpload}>
						<input type="file" onChange={handleImageAsFile} />
						<button>Poslat na server</button>
					</form>
					<button onClick={handleFirebaseDownload}>Načíst obrázek</button>
				</h2>
				<div className="cover-panel-full">
					<div className="cover-panel">
						<div className="item">
							<input type="number" className="__heading" onChange={(e) => setMadeTime(e.target.value)} placeholder="Doba v minutách" /> min
						</div>
						<div className="item">
							<h3>
								<input type="text" className="__heading heading" onChange={(e) => setName(e.target.value)} placeholder="Název receptu" />
							</h3>
						</div>
						<div className="item">
							<input type="number" className="__heading" onChange={(e) => setMadePrice(e.target.value)} placeholder="Cena přípravy" /> Kč
						</div>
					</div>
				</div>
			</div>
			<div className="body-align">
				<div className="short-info">
					<span>
						<textarea type="text" onChange={(e) => setDescription(e.target.value)} placeholder="Krátký popis" rows="10" />
					</span>
				</div>
				<div className="content-box">
					<div className="content">
						<ReactQuill
							onChange={quillHandleChange}
							value={content}
							theme="snow"
							modules={modules}
							formats={formats}
							placeholder="Přidejte váš úžasný recept"
						/>
					</div>
					<div className="side-bar">
						<input type="text" value={humanDate} placeholder="CreatedAt" disabled className="noStyle" />
						<input type="text" disabled value={currentUser.displayName} className="noStyle" />
						<span>
							<select onChange={(e) => onChangeHander(e)}>
								<option value="" disabled selected>
									Hlavní kategorie
								</option>
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
							<select onChange={(e) => setSubCategory(e.target.value)}>
								<option value="" disabled selected>
									Podkategorie
								</option>
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
					if (name === '' || content === '') {
						alert('Název a obsah receptu musí být vyplněn');
					} else {
						addRecipe({
							artist,
							cover,
							createdAt,
							description,
							id: uuid4(),
							madePrice,
							madeTime,
							main,
							name,
							category,
							subCategory,
							content,
							tipOfDay,
						});
					}
				}}
				className="button-save"
			>
				Uložit
			</button>
		</div>
	);
};
export default Create;
