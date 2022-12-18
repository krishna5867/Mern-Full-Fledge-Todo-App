import React, { useState } from 'react';
import axios from "axios";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Row, Col, Button, Input, Container } from "reactstrap";
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const submitData = async () => {
        try {
            const data = {
                name: name,
                email: email,
                password: password,
            };

            const res = await axios.post("/createUser", data);

            if (res.data.success) {
                console.log("User created successfully");
            }
        } catch (error) {
            console.log(error);
            console.log(error.response.data.message);
        }
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        submitData();
        setName("");
        setEmail("");
        setPassword("");
        toast.success("login Successfully", {
        }, 300);
        setTimeout(() => {
        navigate("/todo");           
    });
}



    return (
        <>
            <div className="text-center border border-2 border-warning mx-auto my-5" style={{ width: "23rem" }}>
                <ToastContainer
                    position="top-right"
                    autoClose={1000}
                    theme="dark"
                />
                <Container style={{ width: "17rem" }} className="mt-4 mb-4">
                    <Row>
                        <Col className="todoapp container-fluid">
                            <h3 className="mb-4">Register Form</h3>
                            <div className="d-flex container fluid w-100">
                                <form onSubmit={handleSubmit}>
                                    <Input
                                        className="my-3 mx-auto"
                                        type="text"
                                        name='name'
                                        placeholder="Enter Name"
                                        value={name}
                                        onChange={(event) => setName(event.target.value)}
                                    />
                                    <Input
                                        className="my-3 mx-auto"
                                        type="text"
                                        name='email'
                                        placeholder="Enetr Email"
                                        value={email}
                                        onChange={(event) => setEmail(event.target.value)}
                                    />
                                    <Input
                                        className="my-3 mx-auto"
                                        type="text"
                                        name='password'
                                        placeholder="Enter Password"
                                        value={password}
                                        onChange={(event) => setPassword(event.target.value)}
                                    />
                                    <Button className="btn-warning btn-2lg mt-2">SignUp</Button>
                                </form>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    )
};

export default Signup;