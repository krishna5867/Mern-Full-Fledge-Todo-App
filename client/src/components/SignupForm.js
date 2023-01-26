import React, { useState } from 'react';
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Row, Col, Button, Input, Container } from "reactstrap";
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Signup = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const submitData = async () => {
        try {
            const res = await axios.post("/createUser", {
                name,email,password
            });

            if (res.status === 200) {
                setName("");
                setEmail("");
                setPassword("");
                setTimeout(()=>{
                navigate("/login");
                },2000)
                toast.success("Registered Successfull Login to continue");
                // console.log("User created successfully");
            }else{
                console.log("Login Failed");
            }
        } catch (error) {
            toast.error("Login Failed", {
            }, 300);
            console.log(error.response.data.message);
        }
    };
    
    const handleSubmit = (e) => {
        e.preventDefault();
        submitData(email);

};




    return (
        <>
            <div className="text-center rounded border border-2 border-warning mx-auto my-5" style={{ width: "20rem", height:'22rem' }}>
                <ToastContainer
                    position="top-right"
                    autoClose={1000}
                    theme="dark"
                />
                <Container>
                    <Row>
                        <Col>
                            <h3 className="my-4"><h4>Registration Form</h4></h3>
                            <div>
                                <form onSubmit={handleSubmit}>
                                    <Input
                                        type="text"
                                        name='name'
                                        placeholder="Enter Name"
                                        value={name}
                                        onChange={(event) => setName(event.target.value)}
                                    />
                                    <Input
                                        className="my-3"
                                        type="text"
                                        name='email'
                                        placeholder="Enetr Email"
                                        value={email}
                                        onChange={(event) => setEmail(event.target.value)}
                                    />
                                    <Input
                                        className="my-3"
                                        type="text"
                                        name='password'
                                        placeholder="Enter Password"
                                        value={password}
                                        onChange={(event) => setPassword(event.target.value)}
                                    />
                                    <Button className="btn-warning btn-sm mt-3 col-12 mb-4">SignUp</Button>
                                    <p>Already have Account <b><Link to="/login">SignIn</Link></b></p>
                                    
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