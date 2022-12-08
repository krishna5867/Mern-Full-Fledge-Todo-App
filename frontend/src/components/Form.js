import React, { useState } from 'react';
import axios from "axios";

export const Form = ({ fetchUsersData }) => {
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
            alert("Data Submitted Successfully")
        }, 100);
    };
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label htmlFor="name">Name</label>
                <input type="text"
                    id='name'
                    name='name'
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                /> <br />
                <label htmlFor="email">Email</label>
                <input type="email"
                    id='email'
                    name='email'
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                /> <br />
                <label htmlFor="name">Password</label>
                <input type="password"
                    id='password'
                    name='password'
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                /> <br />
                <button
                    type="Submit"
                >Submit</button>
            </form>
        </div>
    )
};
