import React from 'react';
import RecepieCard from '../components/recepiecard';


const ReceptoryFile = () => {
    return (
        <>
            <div className="cover">
                <div className="overlay"></div>
                {/* <h2>Přidejte fotografii</h2> */}
                <div className="cover-panel-full">
                    <div className="cover-panel">
                        <div className="item">
                            Doba přípravy
                    </div>
                        <div className="item">
                            <h3>Přidejte nadpis</h3>
                        </div>
                        <div className="item">
                            Doba přípravy
                    </div>
                    </div>
                </div>
            </div>
            <div className="body-align">
                <div className="short-info">
                    <p>Maecenas sollicitudin. Aliquam erat volutpat. Duis pulvinar. Vestibulum fermentum tortor id mi. Morbi imperdiet, mauris ac auctor dictum, nisl ligula egestas nulla, et sollicitudin sem purus in lacus. Pellentesque sapien. Etiam dui sem, fermentum vitae, sagittis id, malesuada in, quam. Nunc auctor. Integer pellentesque quam vel velit. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p>
                </div>
                <div className="content-box">
                    <div className="content">
                        <RecepieCard />
                        <RecepieCard />
                        <RecepieCard />
                    </div>
                    <div className="side-bar">
                        <p>uigui</p>
                        <p>uigui</p>
                        <p>uigui</p>
                        <p>uigui</p>
                        <p>uigui</p>

                        <p>uigui</p>
                        <p>uigui</p>
                        <p>uigui</p>

                        <p>uigui</p>

                    </div>
                </div>
            </div>
        </>
    );
}
export default ReceptoryFile;