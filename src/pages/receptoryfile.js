import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.bubble.css';

const ReceptoryFile = ({ recipe }) => {
    const backgroundImage = {
        backgroundImage: `url(${recipe.cover})`
    }
    const timestamp = new Date(recipe.createdAt);
    const humanDate = new Date(timestamp).getDate() + '. ' + new Date(timestamp).getMonth() + '. ' + new Date(timestamp).getFullYear()


    return (
        <>
            <div className="cover" style={backgroundImage}>
                <div className="overlay"></div>
                {/* <h2>Přidejte fotografii</h2> */}
                <div className="cover-panel-full">
                    <div className="cover-panel">
                        <div className="item">
                            {recipe.madeTime} min
                        </div>
                        <div className="item">
                            <h3>{recipe.name}</h3>
                        </div>
                        <div className="item">
                            {recipe.madePrice} Kč
                        </div>
                    </div>
                </div>
            </div>
            <div className="body-align">
                <div className="short-info">
                    <span>{recipe.description}</span>
                </div>
                <div className="content-box">
                    <div className="content">
                        <ReactQuill
                            value={recipe.content}
                            theme={"bubble"}
                            readOnly="true"
                        />
                    </div>
                    <div className="side-bar">
                        <h6>{humanDate}</h6>
                        <h5>{recipe.artist}</h5>
                        <h4>{recipe.category} <span>{recipe.subCategory}</span></h4>
                    </div>
                </div>
            </div>
        </>
    );
}
export default ReceptoryFile;