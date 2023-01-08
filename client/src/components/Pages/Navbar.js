import React from "react";
import axios from "axios";

import { Link } from 'react-router-dom';

const Navbar = () => {

    const Logout = async () => {
        const res = await axios.get("/logout");
        console.log(res);
    }
    

    return (
        <div> 
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark ">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/dashboard"><h2>TodoApp</h2></Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                
                    <div className="collapse navbar-collapse mt-1" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link" to="/signup"><h4>SignUp</h4></Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/login"><h4>SignIn</h4></Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/backenddatalist"><h4>UserData</h4></Link>
                            </li>
                        </ul>
                        <div className="d-flex justify-content-between">
                            {/* <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" /> */}
                            <h5 className='text-white mx-sm-3 mt-2'>krishnaKmr968@gmail.com</h5>
                                <button className="btn btn-warning" onClick={(Logout)}>SignOut</button>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navbar;