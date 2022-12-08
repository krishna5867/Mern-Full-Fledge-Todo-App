import axios from 'axios';
// import React, { useState, useEffect } from 'react';

export const Lists = ({ fetchUsersData, userData, user }) => {

    // const [userData, setUserData] = useState("");

    const fetchData = async () => {
        const res = await axios.get("http://localhost:4000/getusers")
            .then(res => res.json())
            .then(setUserData => res.data.name)
        console.log(res)
        fetchUsersData();
    };


    useEffect(() => {
        fechData();
    }, [])

    return (
        <>
            <h3>List of all Names and Emails</h3>
            {userData &&
                userData.map((user) => {
                    <h3 key={user._id}>`My name is ${user.name} and my email is ${user.email}`</h3>
                    console.log(user);
                })};
        </>
    )

};


