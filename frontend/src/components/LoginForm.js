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
                navigate("/todo");
                console.log("Login successfully");
            } else {
                alert("Login Failed");
            }
        } catch (error) {
            console.log(error);
            console.log(error.response.data.message);
        }
    };
    const handleLogin = (e) => {
        e.preventDefault();
        submitData();
        setEmail("");
        setPassword("");
        toast.success("login Successfully", {
        }, 300);
        setTimeout(()=>{
        navigate("/todo");
        },1000)
    };

    return (
        <>
            <div className="text-center align-center mx-auto my-5  border border-2 border-warning" style={{ width: "23rem" }}>
                <ToastContainer
                    position="top-right"
                    autoClose={1000} />
                <Container style={{ width: "17rem" }} className="mt-4 mb-4">
                    <Row>
                        <Col className="todoapp container-fluid">
                            <h3 className="mb-4">LogIn</h3>
                            <div className="d-flex container fluid w-100">
                                <form onSubmit={handleLogin}>
                                    <Input
                                        className="mx-auto mt-4"
                                        type="text"
                                        placeholder="Email"
                                        value={email}
                                        onChange={(event) => setEmail(event.target.value)}
                                    />
                                    <Input
                                        className="mx-auto mt-4"
                                        type="text"
                                        placeholder="Password"
                                        value={password}
                                        onChange={(event) => setPassword(event.target.value)}
                                    />
                                    <Button className="btn btn-2lg btn-warning  mt-4"
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