import React, { useState } from 'react';
import axios from "axios";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Row, Col, Button, Input, Container } from "reactstrap";



export const SignupForm = ({ fetchUsersData }) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    console.log(name, email);

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
                fetchUsersData();
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
        setTimeout(() => {
            // alert("Data Submitted Successfully")
            toast.success('User Registered', {
            });
        }, 100);
    };



    return (
        <>
            <div className="text-center border border-bottom-secondary">
                <ToastContainer
                    position="top-right"
                    autoClose={1000}
                    theme="dark"
                />
                <Container style={{ width: "17rem" }}>
                    <Row>
                        <Col className="todoapp container-fluid">
                            <h3 className="my-3">Register Form</h3>
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
                                    <Button className="btn-warning btn-sm m-3">SignUp</Button>
                                </form>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    )
};
