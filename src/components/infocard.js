import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';

const Infocard = ({ mainImg, setMainImg, mainImgs }) => {
    const displayImgHandler = (e) => {
        setMainImg(mainImgs[mainImgs.findIndex(x => x.id === e.target.dataset.id)]);
    }

    const backgroundImage = {
        backgroundImage: `url(${mainImg.cover})`
    }

    return (
        <div className="header-box">
            <div className="img-box" style={backgroundImage}>
            </div>
            <div className="card-box">
                <div className="info-card">
                    <div className="heading">
                        <h2>{mainImg.name}</h2>
                    </div>
                    <div className="info-card-footer">
                        <p>
                            <FontAwesomeIcon icon={faExternalLinkAlt} />
                            <a href="facebook.com">Přečíst více</a>
                        </p>
                        <div className="buttons">
                            {mainImgs.map((image) => (
                                <button key={image.id} className={image.id === mainImg.id ? "nextImg active" : "nextImg"} onClick={displayImgHandler} data-id={image.id}></button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Infocard;


