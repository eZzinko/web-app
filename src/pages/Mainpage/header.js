import React from 'react';
import Infocard from '../../components/infocard';

const Header = () => {
    return (
        <div className="header">
            <div className="header-box">
                <div className="img-box">
                </div>
                <div className="card-box">
                    <Infocard />
                </div>
            </div>
        </div>
    )
}
export default Header;