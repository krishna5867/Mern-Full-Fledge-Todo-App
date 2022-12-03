import React, { useState, useEffect } from 'react';
import axios from 'axios';

export const Lists = () => {
    const [userData, setUserData] = useState("");

    const fetchData = async () => {
        const res = await axios.get("/getusers");
        console.log(res)
        console.log("krishna");

        if (res.data.users.length > 0) {
            setUserData(res.data.users);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);


    return (
        <>
            <h3>List of all Names and Emails</h3>
            {/* Here i want to show  all backend data */}
            {userData &&
                userData.map((user) => {
                    <h3>`My name is ${ user.name } and my email is ${ user.email }`</h3>
                    console.log(user);
                })};
        </>
    )

};


