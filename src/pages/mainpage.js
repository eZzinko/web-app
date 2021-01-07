import React from 'react';
import Infocard from '../components/infocard';
import GroupCard from '../components/groupcard';
import InfoLargeCard from "../components/infolargecard";

const Mainpage = () => {
    return (
        <>
            <div className="header">
                <div className="header-box">
                    <div className="img-box">
                    </div>
                    <div className="card-box">
                        <Infocard />
                    </div>
                </div>
            </div>
            <div className="advice">
                <h2>Tip na dnešní den</h2>
                <div className="row">
                    <GroupCard />
                    <GroupCard />
                    <GroupCard />
                </div>
                <div className="mealofday">
                    <div className="card">
                        <InfoLargeCard />
                    </div>
                    <div className="image-box"></div>
                </div>
            </div>
        </>
    );
}
export default Mainpage;