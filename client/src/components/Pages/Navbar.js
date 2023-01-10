import React, { useEffect } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Navbar = (props) => {
    const navigate = useNavigate();

    const logOut = async () => {
        const res = await axios.get("/signout");
        try {
            if (res.status === 200) {
                localStorage.clear()
                navigate("/");
            }
        } catch (error) {
            console.log(error.message)
        };
    };
    useEffect(() => {
    }, [])


    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark ">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/dashboard"><h2>TodoApp {props.email}</h2></Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse mt-1" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link" to="/backenddatalist"><h4>UserData</h4></Link>
                            </li>
                        </ul>
                        <div className="d-flex justify-content-between">
                            {/* <h5 className='text-white mx-sm-3 mt-2'>krishnaKmr968@gmail.com</h5> */}
                            {/* <Link to='/login'><button className="btn btn-warning mx-3">Login</button></Link> */}
                            {localStorage.getItem("token") ? 
                            <button className="btn btn-warning" onClick={logOut}>Logout</button>
                            :
                            <Link to="/signup"><button className="btn btn-warning">Signup</button></Link>
                            }
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navbar;