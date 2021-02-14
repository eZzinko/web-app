import React, { useState, useContext } from 'react';
import { v4 as uuid4 } from "uuid";
import firebase from '../firebase';
import { AuthContext } from '../auth/Auth';


const Create = () => {
    const ref = firebase.firestore().collection("recipe");
    const { currentUser } = useContext(AuthContext);

    const [artist, setArtist] = useState(currentUser.displayName);
    const [cover, setCover] = useState();
    const [createdAt, setCreatedAt] = useState(Date.now());
    const [description, setDescription] = useState();
    const [madePrice, setMadePrice] = useState();
    const [madeTime, setMadeTime] = useState();
    // eslint-disable-next-line
    const [main, setMain] = useState(false);
    const [name, setName] = useState();
    const [category, setCategory] = useState();
    const [subCategory, setSubCategory] = useState();

    function addRecipe(newRecipe) {
        ref
            .doc(newRecipe.id)
            .set(newRecipe)
            .catch((err) => {
                console.error(err);
            })
    }

    return (
        <>



            <div className="cover">
                <div className="overlay"></div>
                <h2><input type="text" onChange={(e) => setCover(e.target.value)} /></h2>
                <div className="cover-panel-full">
                    <div className="cover-panel">
                        <div className="item">
                            <input type="text" onChange={(e) => setMadeTime(e.target.value)} placeholder="MadeTime" /> min
                        </div>
                        <div className="item">
                            <h3><input type="text" onChange={(e) => setName(e.target.value)} placeholder="Name" /></h3>
                        </div>
                        <div className="item">
                            <input type="text" onChange={(e) => setMadePrice(e.target.value)} placeholder="MadePrice" />  Kč
                        </div>
                    </div>
                </div>
            </div>
            <div className="body-align">
                <div className="short-info">
                    <span><input type="text" onChange={(e) => setDescription(e.target.value)} placeholder="Description" /></span>
                </div>
                <div className="content-box">
                    <div className="content">

                    </div>
                    <div className="side-bar">
                        <input type="text" onChange={(e) => setCreatedAt(e.target.value)} placeholder="CreatedAt" disabled />
                        <input type="text" onChange={(e) => setArtist(e.target.value)} placeholder="Artist" disabled />
                        <span><input type="text" onChange={(e) => setCategory(e.target.value)} placeholder="Category" /></span>
                        <span><input type="text" onChange={(e) => setSubCategory(e.target.value)} placeholder="SubCategory" /></span>

                    </div>
                </div>
            </div>
            <button onClick={() => addRecipe({ artist, cover, createdAt, description, id: uuid4(), madePrice, madeTime, main, name, category, subCategory })} className="button-save">Uložit</button>
        </>
    );
}
export default Create;