import React from 'react';


const PlaceholderCard = ({ style }) => {
    console.log("[style]: ", style);
    if (!style) {
        return (

            <div className="placeholdercard">
                <div className="img-place">
                </div>
                {/* <div className="text-area">
                    <h3>&nbsp;</h3>
                    <hr />
                    <div className="text-area-footer">
                        <h3>&nbsp;<span>&nbsp;</span></h3>
                        <h3>&nbsp;</h3>
                    </div>
                </div> */}
            </div>

        )
    }
    else {
        return (

            <div className="placeholdercard">
                <div className="img-place">
                </div>
                <div className="text-area">
                    <h3>&nbsp;</h3>
                    <hr />
                    <div className="text-area-footer">
                        <h3>&nbsp;<span>&nbsp;</span></h3>
                        <h3>&nbsp;</h3>
                    </div>
                </div>
            </div>

        )
    }
}
export default PlaceholderCard;