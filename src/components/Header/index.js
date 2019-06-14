import React from 'react';
import Navbar from '../Navbar';



export default function Header(props) {
    const logo = require('./projektlogga.png');
    return (
        <header className ='headerComponent' data-test='header-component'>
        <div className="my-rounded p-20 blue">
            <div className="container">
                <div className="row">
                    <div className="col-md-4 col-12 text-center">
                        <img src={logo} className="p-3 img-fluid sweden-logo" alt="2Sweden logo"  data-test='header-logo' />
                        <button className="navbar-toggler btn nav-drop yellow smallNav" type="button" data-toggle="collapse" data-target="#navbarToggleExternalContent" aria-controls="navbarToggleExternalContent" aria-expanded="false" aria-label="Toggle navigation">
                            <i className="fas fa-bars"></i>
                        </button>
                    </div>
                    <Navbar />
                </div>
            </div>
        </div>
        </header>
    );
}