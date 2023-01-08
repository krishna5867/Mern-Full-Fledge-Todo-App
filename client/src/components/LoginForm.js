import React, { useState } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Row, Col, Button, Input, Container } from "reactstrap";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const submitData = async () => {
        try {
            const res = await axios.post("http://localhost:4000/login", {
                email, password
            });
            if (res.data.success) {
            setTimeout(()=>{
            navigate("/dashboard");
            },1000)
            toast.success("login Successfully", {
            }, 300);
            setEmail("");
            setPassword("");
                console.log("Login successfully");
            } else {
                alert("Login Failed");
            }
        } catch (error) {
            alert("Invalid User Details");
            console.log(error);
            console.log(error.response.data.message);
        }
    };
    const handleLogin = (e) => {
        e.preventDefault();
        submitData();
       
    };

    return (
        <>
            <div className="text-center align-center mx-auto  border border-2 border-warning my-5" style={{ width: "33rem",height:'30rem' }}>
                <ToastContainer
                    position="top-right"
                    autoClose={1000} />
                <Container className="mt-4 mb-4">
                    <Row>
                        <Col>
                            <h3 className="mb-5 my-5"><h2>Login Form</h2></h3>
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
                                    <Button className="btn btn-2lg btn-warning col-md-12  mt-4"
                                    >SignIn</Button>
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