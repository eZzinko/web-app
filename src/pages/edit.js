import React, { useState, useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { v4 as uuid4 } from "uuid";
import firebase from '../firebase';
import { AuthContext } from '../auth/Auth';
import ReactQuill, { Quill } from 'react-quill';
import quillEmoji from 'quill-emoji';
import 'react-quill/dist/quill.snow.css';


const Edit = ({ recipe, recipeLink }) => {
    const history = useHistory();
    console.log("[recipe]: ", recipe);
    const ref = firebase.firestore().collection("recipe");
    const { currentUser } = useContext(AuthContext);

    const [artist, setArtist] = useState(currentUser.displayName);
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

    console.log("[ID]: ", recipe.id);

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

    return (
        <>
            <div className="cover">
                <div className="overlay"></div>
                <h2><input type="text" onChange={(e) => setCover(e.target.value)} value={recipe.cover} /></h2>
                <div className="cover-panel-full">
                    <div className="cover-panel">
                        <div className="item">
                            <input type="text" onChange={(e) => setMadeTime(e.target.value)} placeholder="MadeTime" value={recipe.madeTime} /> min
                        </div>
                        <div className="item">
                            <h3><input type="text" onChange={(e) => setName(e.target.value)} placeholder="Name" defaultValue={recipe.name} /></h3>
                        </div>
                        <div className="item">
                            <input type="text" onChange={(e) => setMadePrice(e.target.value)} placeholder="MadePrice" value={recipe.madePrice} />  Kč
                        </div>
                    </div>
                </div>
            </div>
            <div className="body-align">
                <div className="short-info">
                    <span><input type="text" onChange={(e) => setDescription(e.target.value)} placeholder="Description" value={recipe.description} /></span>
                </div>
                <div className="content-box">
                    <div className="content">
                        <ReactQuill
                            onChange={quillHandleChange}
                            value={content}
                            // defaultValue={recipe.content}
                            theme="snow"
                            modules={modules}
                            formats={formats}
                            placeholder="Přidejte váš úžasný recept"
                        />
                    </div>
                    <div className="side-bar">
                        <input type="text" onChange={(e) => setCreatedAt(e.target.value)} placeholder="CreatedAt" disabled />
                        <input type="text" onChange={(e) => setArtist(e.target.value)} placeholder="Artist" disabled />
                        <span><input type="text" onChange={(e) => setCategory(e.target.value)} placeholder="Category" /></span>
                        <span><input type="text" onChange={(e) => setSubCategory(e.target.value)} placeholder="SubCategory" /></span>

                    </div>
                </div>
            </div>
            <button onClick={() => addRecipe({ artist, cover, createdAt, description, id: uuid4(), madePrice, madeTime, main, name, category, subCategory, content })} className="button-save">Uložit</button>
        </>
    );
}
export default Edit;