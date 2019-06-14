import React from 'react';



export default function Navbar() {
    return (

        <nav className="col-lg-8 col-md-8">
            <div className="navbar bigNav">
                <ul className="d-flex text-center justify-content-between btn-group">
                    <a href="index.html" className="yellow btn btn-primary">Sök resor</a>
                    <a href="index.html" className="yellow btn btn-primary">Läs om eventet</a>
                    <a href="index.html" className="yellow btn btn-primary">Läs om våra orter</a>
                    <a href="index.html" className="yellow btn btn-primary">Se rekommendationer</a>
                </ul>
            </div>
            <div><h1 className="tosweden-h3 text-yellow display-4 text-center d-none d-md-block">2Sweden</h1></div>
            <div className="pos-f-t smallNav">
                <div className="collapse" id="navbarToggleExternalContent">
                    <div className="p-4">
                        <ul className="text-center">
                            <a href="index.html" className="yellow btn btn-block btn-primary">Sök resor</a>
                            <a href="index.html" className="yellow btn btn-block btn-primary">Läs om eventet</a>
                            <a href="index.html" className="yellow btn btn-block btn-primary">Läs om våra orter</a>
                            <a href="index.html" className="yellow btn btn-block btn-primary">Se rekommendationer</a>
                        </ul>
                    </div>
                </div>
            </div>
        </nav>


    );
}