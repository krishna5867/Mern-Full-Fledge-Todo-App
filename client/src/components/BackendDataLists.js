import React, { useState } from "react";
import axios from 'axios';
import { useEffect } from "react";
import { Container, Card, CardBody } from "reactstrap";

const BackendDataList = () => {
    const [userData, setUserData] = useState([]);

    // geting users
    const fetchUserData = async () => {
        const res = await axios.get("/getusers");
        console.log(res);
        if (res.status === 200) {
            setUserData(res.data.users);
            console.log(res.user);
        } else {
            console.log("Something wrong in getting data");
        }
    }

    const DashboardValid = async () => {
        let token = localStorage.getItem("token");
        const res = await fetch("/isloggedin", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": token
            }
        });
        const data = await res.json();
        if (data.status === 401 || !data) {
            console.log("user not verify");
        } else {
            console.log("user verify");
            setUserData(data)
        }
    }

    useEffect(() => {
        fetchUserData();
        setTimeout(() => {
            DashboardValid();
        }, 2000)
    }, [userData])


    return (
        <>
            User Details those who are already registered.
            {userData && userData.map((user) => (
                <>
                    <Container>
                        <Card key={user._id}>
                            <CardBody>
                                NAME-<b>{user.name.toUpperCase()}</b> EMAIL-
                                <b>{user.email}</b> 
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

export default BackendDataList;

