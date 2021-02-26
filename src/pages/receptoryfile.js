import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.bubble.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';

import firebase from '../firebase';

const ReceptoryFile = ({ logged }) => {
    useEffect(() => {
        document.title = `${currentDoc.name} | Moje kuchařka`;
    });
    // console.log(asyncDataID);

    const [currentDoc, setCurrentDoc] = useState([]);
    const backgroundImage = {
        backgroundImage: `url(${currentDoc.cover})`
    };
    const timestamp = new Date(currentDoc.createdAt);
    const humanDate = new Date(timestamp).getDate() + '. ' + (new Date(timestamp + 60).getMonth() + 1) + '. ' + new Date(timestamp).getFullYear();



    const history = useHistory();
    const ref = firebase.firestore().collection("recipe");
    const removeDocs = () => {
        ref
            .doc(currentDoc.id)
            .delete()
            .then(() => {
                console.log("Document successfully deleted!");
                history.push("/receptar");
            })
            .catch((err) => {
                console.error("Error removing document: ", err);

            })
    }


    // const [firestoreLoading, setFirestoreLoading] = useState(true);

    // const [asyncData, setAsyncData] = useState([]);
    // const [data, setData] = useState([]);


    // console.log("[useHistory]: ", history.location.pathname);
    const historyLink = history.location.pathname;
    const historySubString = historyLink.substring(10)
    // console.log("[History subString]: ", historySubString);


    const getRecipes = async () => {
        let activeData = [];
        // console.log("[activeData SET]:", activeData);
        activeData = await firebase.firestore().collection('recipe').doc(historySubString).get();
        // console.log("[activeData POS]:", activeData);
        setCurrentDoc(activeData.data());
    }
    // console.log(currentDoc);



    //Execute API get request
    useEffect(() => {
        getRecipes();
        // eslint-disable-next-line
    }, []);

    // useEffect(() => {
    //     if (currentDoc.length > 0) {
    //         setFirestoreLoading(false);
    //         console.log("[Document not ready]");

    //     }
    // })


    // const cookies = new Cookies();

    // cookies.set('Recipe Data', currentDoc, { path: `/receptar/${currentDoc.id}`, expires: new Date(Date.now() + 30) });
    // console.log(cookies.get('Recipe Data'));


    // console.log("[History]: ", window.history);

    return (
        <>
            <div className="cover" style={backgroundImage}>
                <div className="overlay"></div>
                {/* <h2>Přidejte fotografii</h2> */}
                <div className="cover-panel-full">
                    <div className="cover-panel">
                        <div className="item">
                            {currentDoc.madeTime} min
                        </div>
                        <div className="item">
                            <h3>{currentDoc.name}</h3>
                        </div>
                        <div className="item">
                            {currentDoc.madePrice} Kč
                        </div>
                    </div>
                </div>
            </div>
            <div className="body-align">
                <div className="short-info">
                    <span>{currentDoc.description}</span>
                </div>
                <div className="content-box">
                    <div className="content">
                        <ReactQuill
                            value={currentDoc.content || ''}
                            theme={"bubble"}
                            readOnly={true}
                        />
                    </div>
                    <div className="side-bar">
                        {logged ? <FontAwesomeIcon icon={faTrash} onClick={removeDocs} /> : ""}
                        {logged ? <Link to={`/edit/${currentDoc.id}`}><FontAwesomeIcon icon={faEdit} /></Link> : ""}
                        <h6>{humanDate}</h6>
                        <h5>{currentDoc.artist}</h5>
                        <h4>{currentDoc.category} <span>{currentDoc.subCategory}</span></h4>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ReceptoryFile;