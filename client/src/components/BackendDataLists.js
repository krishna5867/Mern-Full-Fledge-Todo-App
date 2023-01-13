import React, { useState } from "react";
import axios from 'axios';
import { useEffect } from "react";
import { Container, Card, CardBody } from "reactstrap";

const BackendDataList = () => {
    const [userData, setUserData] = useState([]);

    // geting users
    const fetchUserData = async () => {
        const res = await axios.get("/getUsers", {
            withCredentials: true
        });
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
        setTimeout(() => {
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

