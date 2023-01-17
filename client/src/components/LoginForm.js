import React, { useState } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Row, Col, Button, Input, Container } from "reactstrap";

const Login = () => {
    const [email, setEmail] = useState("k@k.com");
    const [password, setPassword] = useState("password");

    const navigate = useNavigate();

    const submitData = async (email) => {
        try {
            const res = await axios.post("/login", {
                email, password
            });
            if (res.data.success) {
                navigate("/");
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


    return (
        <>
            <div className="text-center align-center mx-auto  border border-2 border-warning my-5" style={{ width: "28rem", height: '28rem' }}>
                <ToastContainer
                    position="top-right"
                    autoClose={1000} />
                <Container className="mt-4 mb-4">
                    <Row>
                        <Col>
                            <h3 className="mb-5 my-4"><h2>Login Form</h2></h3>
                            <div>
                                <form onSubmit={handleLogin}>
                                    <Input
                                        className="mx-auto my-4"
                                        type="text"
                                        placeholder="Email"
                                        value={email}
                                        onChange={(event) => setEmail(event.target.value)}
                                    />
                                    <Input
                                        className="mx-auto my-4"
                                        type="text"
                                        placeholder="Password"
                                        value={password}
                                        onChange={(event) => setPassword(event.target.value)}
                                    />
                                    <Button className="btn btn-2lg btn-warning col-md-12  mt-4 mb-4"
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