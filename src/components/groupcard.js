import React from 'react';

const GroupCard = ({ text }) => {
    const backgroundImage = {
        backgroundImage: `url(${text.cover})`
    }
    return (
        <div className="groupcard" style={backgroundImage}>
            <a href>{text.name}</a>
            <div className="shadow-burn"></div>
        </div>
    )
}
export default GroupCard;