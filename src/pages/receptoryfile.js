import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.bubble.css';

const ReceptoryFile = ({ recipe }) => {
    const backgroundImage = {
        backgroundImage: `url(${recipe.cover})`
    }



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
                        <span>uuid()</span>

                    </div>
                </div>
            </div>
        </>
    );
}
export default ReceptoryFile;