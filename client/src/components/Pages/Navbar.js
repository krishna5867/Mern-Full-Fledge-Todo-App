import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();
    const [data, setData] = useState("");

    const validUser = async ()=> {
        const res = await axios.get('/isloggedin');
        if(res.status === 200){
            setData(res.data)
            console.log("user is authorized");
        }else{
            console.log("user is not authorized");
        }
    };

    const logOut = async () => {
        try {
            const res = await axios.get("/signout");
            if (res.status === 200) {
                navigate("/login");
                setData("");
            }
        } catch (error) {
            console.log(error.message)
        };
    };

    useEffect(() =>{
        validUser();
    }, [data]);


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
                                <Link className="nav-link" to="/backenddatalist"><h4>Users</h4></Link>
                            </li>
                        </ul>
                        <div className="d-flex justify-content-between">
                            {
                            data ? 
                            <>
                            <h5 className='text-white mx-sm-3 mt-2'>{data.loggedInUser?.email}</h5>
                            <button className="btn btn-warning" onClick={logOut}>Logout</button>
                            </> :
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