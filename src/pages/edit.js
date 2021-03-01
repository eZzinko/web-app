import React, { useState, useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { v4 as uuid4 } from "uuid";
import firebase from '../firebase';
import { AuthContext } from '../auth/Auth';
import ReactQuill, { Quill } from 'react-quill';
import quillEmoji from 'quill-emoji';
import 'react-quill/dist/quill.snow.css';


const Edit = () => {
    const [currentDoc, setCurrentDoc] = useState([]);
    const history = useHistory();
    const ref = firebase.firestore().collection('recipe');

    const { currentUser } = useContext(AuthContext);
    console.log(currentUser);

    const [artist, setArtist] = useState("");
    const [cover, setCover] = useState("");
    const [createdAt, setCreatedAt] = useState(Date.now());
    const [description, setDescription] = useState("some text testin");
    const [madePrice, setMadePrice] = useState("");
    const [madeTime, setMadeTime] = useState("");
    // eslint-disable-next-line
    const [main, setMain] = useState(false);
    const [name, setName] = useState("");
    const [category, setCategory] = useState("");
    const [subCategory, setSubCategory] = useState("");
    const [content, setContent] = useState();

    const timestamp = new Date(currentDoc.createdAt);
    const humanDate = new Date(timestamp).getDate() + '. ' + (new Date(timestamp + 60).getMonth() + 1) + '. ' + new Date(timestamp).getFullYear();


    function addRecipe(editRecipe) {
        ref
            .doc(editRecipe.id)
            .set(editRecipe)
            .then(() => {
                console.log("Document successfully written!");
            })
            .catch((err) => {
                console.error("Error writing document: ", err);
            })
        history.push("/receptar");
    }

    // Quill
    const { EmojiBlot, ShortNameEmoji, ToolbarEmoji, TextAreaEmoji } = quillEmoji;
    Quill.register({
        'formats/emoji': EmojiBlot,
        'modules/emoji-shortname': ShortNameEmoji,
        'modules/emoji-toolbar': ToolbarEmoji,
        'modules/emoji-textarea': TextAreaEmoji
    }, true);

    const modules = {
        toolbar: {
            container: [
                [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
                [{ 'font': [] }],
                [{ 'align': [] }],
                ['bold', 'italic', 'underline'],
                [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                [{ 'color': [] }, { 'background': [] }],
                ['emoji']
            ],
        },
        'emoji-toolbar': true,
        'emoji-textarea': true,
        'emoji-shortname': true,
    };

    const formats = [
        'header', 'font', 'size',
        'bold', 'italic', 'underline', 'strike', 'blockquote',
        'list', 'bullet', 'indent', 'align',
        'link', 'image', 'background', 'color', 'emoji'
    ]
    const quillHandleChange = (value) => {
        setContent(value);
        console.log(content);
    }


    useEffect(() => {
        document.title = `Nový recept | Moje kuchařka`;
    })

    const historyLink = history.location.pathname;
    const historySubString = historyLink.substring(6)
    console.log("[History subString]: ", historySubString);


    const getRecipes = async () => {
        let activeData = [];
        console.log("[activeData SET]:", activeData);
        activeData = await firebase.firestore().collection('recipe').doc(historySubString).get();
        console.log("[activeData POS]:", activeData);
        setCurrentDoc(activeData.data());
    }
    console.log(currentDoc);

    //Execute API get request
    useEffect(() => {
        getRecipes();
        // eslint-disable-next-line
    }, []);

    return (
        <>
            <div className="cover">
                <div className="overlay"></div>
                <h2><input type="text" onChange={(e) => setCover(e.target.value)} value={currentDoc.cover} defaultValue={currentDoc.cover} /></h2>
                <div className="cover-panel-full">
                    <div className="cover-panel">
                        <div className="item">
                            <input type="text" onChange={(e) => setMadeTime(e.target.value)} placeholder="MadeTime" defaultValue={currentDoc.madeTime} de /> min
                        </div>
                        <div className="item">
                            <h3><input type="text" onChange={(e) => setName(e.target.value)} placeholder="Name" defaultValue={currentDoc.name} /></h3>
                        </div>
                        <div className="item">
                            <input type="text" onChange={(e) => setMadePrice(e.target.value)} placeholder="MadePrice" defaultValue={currentDoc.madePrice} />  Kč
                        </div>
                    </div>
                </div>
            </div>
            <div className="body-align">
                <div className="short-info">
                    <span><input type="text" onChange={(e) => setDescription(e.target.value)} placeholder="Description" defaultValue={currentDoc.description} /></span>
                </div>
                <div className="content-box">
                    <div className="content">
                        <ReactQuill
                            onChange={quillHandleChange}
                            defaultValue={currentDoc.content || ''}
                            theme="snow"
                            modules={modules}
                            formats={formats}
                            placeholder="Přidejte váš úžasný recept"
                        />
                    </div>
                    <div className="side-bar">
                        <input type="text" onChange={(e) => setCreatedAt(e.target.value)} placeholder="CreatedAt" disabled defaultValue={humanDate} />
                        <input type="text" onChange={(e) => setArtist(e.target.value)} placeholder="Artist" disabled defaultValue={currentDoc.artist} />
                        <span><input type="text" onChange={(e) => setCategory(e.target.value)} placeholder="Category" defaultValue={currentDoc.category} /></span>
                        <span><input type="text" onChange={(e) => setSubCategory(e.target.value)} placeholder="SubCategory" defaultValue={currentDoc.subCategory} /></span>

                    </div>
                </div>
            </div>
            <button onClick={() => addRecipe({ artist, cover, createdAt, description, id: uuid4(), madePrice, madeTime, main, name, category, subCategory, content })} className="button-save">Uložit</button>
        </>
    );
}
export default Edit;