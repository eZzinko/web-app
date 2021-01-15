import React, { useState } from 'react';
import Infocard from '../components/infocard';
import GroupCard from '../components/groupcard';
import InfoLargeCard from "../components/infolargecard";

const Mainpage = ({ recipes }) => {
    let allItem = [...recipes];
    let row = [];
    for (let i = 0; i < 3; i++) {
        row.push(<GroupCard text={recipes[Math.floor(Math.random() * allItem.length)]} />);
    }

    const [mainImgs, setMainImgs] = useState(recipes.filter(button => button.main === true));
    const [mainImg, setMainImg] = useState(mainImgs[0]);

    return (
        <>
            <div className="header">
                <Infocard mainImg={mainImg} setMainImg={setMainImg} mainImgs={mainImgs} />
            </div>
            <div className="body-align">
                <div className="advice">
                    <h2>Tip dnešního dne</h2>
                    <div className="row">
                        {row}
                    </div>
                    <div className="mealofday">
                        <div className="card">
                            <InfoLargeCard />
                        </div>
                        <div className="image-box"></div>
                    </div>
                </div>
                <div className="category">
                    <h2>Kategorie</h2>
                    <div className="row">
                        <GroupCard text={recipes[0]} />
                        <GroupCard text={recipes[0]} />
                        <GroupCard text={recipes[0]} />
                        <GroupCard text={recipes[0]} />
                        <GroupCard text={recipes[0]} />
                        <GroupCard text={recipes[0]} />

                    </div>
                </div>
            </div>
        </>
    );
}
export default Mainpage;