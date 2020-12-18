import React from 'react';

const Infocard = () => {
    return (
        <div className="info-card">
            <div className="heading">
                <h2>Lorem ipsum sit amet</h2>
            </div>
            <div className="info-card-footer">
                <p>
                    <a href="c.com">Přečíst více</a>
                </p>
                <div className="buttons">
                    <button className="nextImg active"></button>
                    <button className="nextImg"></button>
                    <button className="nextImg"></button>
                </div>
            </div>
        </div>
    )
}
export default Infocard;