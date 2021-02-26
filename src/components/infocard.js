import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';

const Infocard = ({ asyncDataMain }) => {

    const [allData, setAllData] = useState([])
    const [activeData, setActiveData] = useState(allData[1]);
    console.log(activeData);
    console.log(allData);
    console.log(asyncDataMain);
    useEffect(() => {
        const filterArr = [];
        asyncDataMain.forEach(data => {
            if (data.main === true) {
                filterArr.push(data);
            }
        });
        console.log("[forEach]: ", filterArr);
        setAllData(filterArr);
    })

    const displayImgHandler = (e) => {
        setActiveData(asyncDataMain[asyncDataMain.findIndex(x => x.id === e.target.dataset.id)]);
    }


    return (
        <div className="header-box">
            {/* <div className="img-box" style={backgroundImage}> */}
            <div className="img-box" >
            </div>
            <div className="card-box">
                <div className="info-card">
                    <div className="heading">
                        <h2>
                            { }</h2>
                    </div>
                    <div className="info-card-footer">
                        <span>
                            {/* <Link to={`/receptar/${activeData.id}`} > */}
                            <div>
                                <FontAwesomeIcon icon={faExternalLinkAlt} />
                                Přečíst více
                                </div>
                            {/* </Link> */}
                        </span>
                        <div className="buttons">
                            {allData.map((image) => (
                                <button key={image.id} className={image.id === asyncDataMain.id ? "nextImg active" : "nextImg"} onClick={displayImgHandler} data-id={image.id}></button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Infocard;


