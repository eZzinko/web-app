import React, { useState } from 'react';
import { v4 as uuid4 } from "uuid";
import firebase from '../firebase';


const Create = () => {
    const ref = firebase.firestore().collection("recipe");

    const [artist, setArtist] = useState();
    const [cover, setCover] = useState();
    const [createdAt, setCreatedAt] = useState();
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
            <div className="database-add">

                <h1>Some text</h1>
            </div>
            <div className="body-align">
                <h2>Add new</h2>
                <p>
                    <label htmlFor="">Artist</label>
                    <input type="text" onChange={(e) => setArtist(e.target.value)} />
                </p>
                <p>
                    <label htmlFor="">Cover</label>
                    <input type="text" onChange={(e) => setCover(e.target.value)} />
                </p>
                <p>
                    <label htmlFor="">createdAt</label>
                    <input type="text" onChange={(e) => setCreatedAt(e.target.value)} />
                </p>
                <p>
                    <label htmlFor="">description</label>
                    <input type="text" onChange={(e) => setDescription(e.target.value)} />
                </p>
                <p>
                    <label htmlFor="">madePrice</label>
                    <input type="text" onChange={(e) => setMadePrice(e.target.value)} />
                </p>
                <p>
                    <label htmlFor="">madeTime</label>
                    <input type="text" onChange={(e) => setMadeTime(e.target.value)} />
                </p>
                <p>
                    <label htmlFor="">Name</label>
                    <input type="text" onChange={(e) => setName(e.target.value)} />
                </p>
                <p>
                    <label htmlFor="">Category</label>
                    <input type="text" onChange={(e) => setCategory(e.target.value)} />
                </p>
                <p>
                    <label htmlFor="">subCategory</label>
                    <input type="text" onChange={(e) => setSubCategory(e.target.value)} />
                </p>

                <button onClick={() => addRecipe({ artist, cover, createdAt, description, id: uuid4(), madePrice, madeTime, main, name, category, subCategory })}>Submit</button>
            </div>
        </>
    );
}
export default Create;