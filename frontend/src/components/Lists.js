import React, { useState } from "react";
import axios from 'axios';
import { useEffect } from "react";


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
    }, [])

    return (
        <>
            <h3>Printing- List of all Names and Emails here</h3>
            {userData && userData.map((user) => (
                <>
                    <div key={user._id}>`My name is ${user.name} and my email is     
                        ${user.email}`
                    </div>
                </>
            ))}
        </>
    )
};


