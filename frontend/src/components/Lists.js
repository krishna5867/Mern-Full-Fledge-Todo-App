import React, { useState } from "react";
import axios from 'axios';
import { useEffect } from "react";
import { Container, Card, CardBody } from "reactstrap";


export const Lists = () => {
    const [userData, setUserData] = useState([]);

    const fetchUserData = async () => {
        const res = await axios.get("http://localhost:4000/getusers");
        console.log(res);
        if (res.status === 200) {
            setUserData(res.data.users);
            console.log(res.user);
        } else {
            console.log("Something wrong in getting data");
        }
    }
    useEffect(() => {
        fetchUserData();
    }, [userData])

    const handleEdit = async (user) => {
        const userName = prompt("Enter new Name");
        const userEmail = prompt("Enter new Email");

        if (!userName || !userEmail) {
            alert("Please enter both field");
        } else {
            const res = await axios.put(`http://localhost:4000/edituser/${user._id}`, {
                name: "userName",
                email: "userEmail",
                user
            });
            console.log(res);
                }
        };

        const handleDelete = async (userId) => {
            alert("Are your Sure");
            const res = await axios.delete(`http://localhost:4000/deleteUser/${userId}`);
            console.log(res);
        };


    return (
        <>
            {userData && userData.map((user) => (
                <>
                <Container>
                    <Card key={user._id}>
                        <CardBody>
                        `NAME-<b>{user.name.toUpperCase()}</b> EMAIL-
                        <b>{user.email}</b>`
                        <button className="btn btn-secondary btn-sm mx-4" onClick={handleEdit}>Edit</button>
                        <button className="btn btn-danger btn-sm" onClick={handleDelete}>Delete</button>
                        </CardBody>
                    </Card>
                </Container>
                    <div >
                    </div>
                </>
            ))}
        </>
    )
};


