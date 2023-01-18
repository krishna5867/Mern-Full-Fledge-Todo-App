import React, { useState } from "react";
import axios from 'axios';
import { useEffect } from "react";
import { Container, Card, CardBody } from "reactstrap";

const Users = () => {
    const [userData, setUserData] = useState([]);
    const [data, setData] = useState();

    const validUser = async () => {
        const res = await axios.get('/isloggedin');
        if (res.status === 200) {
            setData(res.data);
            console.log("user is authorized");
        } else {
            console.log("user is not authorized");
        }
    };

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
        validUser();
        setTimeout(() => {
        }, 2000)
    }, [userData,data])


    return (
        <>
            {
                data ? 
                <>
                <Container className="mt-3 mb-5 text-center">
                    <h2>User Details those who are already registered.</h2>
                </Container>
            {userData && userData.map((user) => (
                <>
                    <Container className="mt-2 text-center">
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
                </>: 
                <Container fluid className="mt-5 text-center">
                            <h2> 
                        Login First To Access This Page ...!
                            </h2>
                </Container>
            }
        </>
    )
};

export default Users;

