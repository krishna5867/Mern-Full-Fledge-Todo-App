import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Todo from '../Todos/Todo';
import Signup from '../SignupForm';


const Dashboard = () => {
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

    useEffect(() => {
        validUser()
    }, [data])
    return (
        <div>
            {
                data ?
                    <Todo />
                    :
                    <Signup />
            }
        </div>
    )
}

export default Dashboard;