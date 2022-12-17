import React from 'react'
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <div> 
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/todo">TodoApp</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link" to="/signup">SignUp</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/login">SignIn</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/backenddatalist">UserData</Link>
                            </li>
                        </ul>
                        <div className="d-flex justify-content-between">
                            {/* <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" /> */}
                            <h5 className='text-white mx-sm-3 mt-2'>krishna@gmail.com</h5>
                                <button className="btn btn-warning">SignOut</button>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navbar;