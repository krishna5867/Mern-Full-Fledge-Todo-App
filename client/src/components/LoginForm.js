import React, { useState, useEffect } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Row, Col, Button, Input, Container } from "reactstrap";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const validUser = async () => {
        const res = await axios.get('/isloggedin');
        if (res.status === 200) {
            // console.log("user is authorized");
        } else {
            // console.log("user is not authorized");
        }
    };

    const submitData = async (email) => {
        try {
            const res = await axios.post("/login", {
                email, password
            });
            if (res.data.success) {
                navigate("/");
                validUser();
                toast.success("login Successfully", {
                }, 300);
                setEmail("");
                setPassword("");
                // console.log("Login successfully");
            } else {
                console.log("Login Failed");
            }
        } catch (error) {
            toast.error("Login failed", {
            }, 300)
            console.log(error.message);
        }
    };
    const handleLogin = (e) => {
        e.preventDefault();
        submitData(email);
    };
    useEffect(()=>{
        
    },[email])


    return (
        <>
            <div className="text-center border rounded border-2 border-warning mx-auto my-5" style={{ width: "20rem", height:'22rem' }}>
                <ToastContainer
                    position="top-right"
                    autoClose={1000} />
                <Container>
                    <Row>
                        <Col>
                            <h3 className="my-4 mb-5"><h4>Login Form</h4></h3>
                            <div>
                                <form onSubmit={handleLogin}>
                                    <Input
                                        type="text"
                                        placeholder="Email"
                                        value={email}
                                        onChange={(event) => setEmail(event.target.value)}
                                    />
                                    <Input
                                        className="my-3"
                                        type="text"
                                        placeholder="Password"
                                        value={password}
                                        onChange={(event) => setPassword(event.target.value)}
                                    />
                                    <Button className="btn btn-sm btn-warning col-12  mt-3 mb-5"
                                    >SignIn</Button>
                                    <p>Don't have Account <b><Link to="/signup">SignUp</Link></b></p>

                                </form>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    )
};

export default Login;