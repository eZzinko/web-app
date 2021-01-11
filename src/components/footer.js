import React from 'react';


const Footer = () => {

    return (
        <>
            <footer>
                <div className="footer-container">
                    <div className="column">
                        <h5>Navigace</h5>
                        <ul>
                            <li>Domů</li>
                            <li>Receptář</li>
                            <li>Blog</li>
                            <li>Kontakty</li>
                        </ul>
                    </div>
                    <div className="column">
                        <h5>Cesta chutí</h5>
                        <ul>
                            <li>Domů</li>
                            <li>Receptář</li>
                            <li>Blog</li>
                            <li>Kontakty</li>
                        </ul>
                    </div>
                    <div className="column">
                        <h5>Sledujte</h5>
                        <ul>
                            <li>Domů</li>
                            <li>Receptář</li>
                            <li>Blog</li>
                            <li>Kontakty</li>
                        </ul>
                    </div>
                </div>
                <div className="copy">
                    <p>Copyright &copy; 2020 - DEV&amp;Design Daniel Neuman</p>
                </div>
            </footer>
        </>
    );
}
export default Footer;