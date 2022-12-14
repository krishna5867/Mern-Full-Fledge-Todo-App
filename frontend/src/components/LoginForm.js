import React, { useState } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Row, Col, Button, Input, Container } from "reactstrap";

export const LoginForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const submitData = async () => {
        try {
            const res = await axios.post("http://localhost:4000/login");
            if (res.data.success) {
                console.log("Login successfully");
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
    };

    return (
        <>
            <div className="text-center border border-bottom-secondary">
                <ToastContainer
                    position="top-right"
                    autoClose={1000} />
                <Container style={{ width: "17rem" }}>
                    <Row>
                        <Col className="todoapp container-fluid">
                            <h3 className="my-3">LogIn</h3>
                            <div className="d-flex container fluid w-100">
                                <form onSubmit={handleLogin}>
                                    <Input
                                        className="mx-auto"
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
                                    <Button className="btn-warning btn-sm m-3"
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
