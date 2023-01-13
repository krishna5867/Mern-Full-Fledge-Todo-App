import React, { useState, useEffect } from 'react';
import axios from "axios";
import { Input, Button } from "reactstrap";

const SearchForm = () => {
    const [search, setSearch] = useState('');


    const featchSearch = async () => {
        const res = axios.get(`/search?q=${search}`);
        if (res.status === 200) {
            setSearch(res.data.todo);
        } else {
            console.log("something went wrong");
        }
    };

    const handleChange = (event) => {
        setSearch(event.target.value);
        featchSearch();
    };

    useEffect(() => {
        featchSearch();
    }, []);

    return (
        <>
            <div className='d-flex'>
                <Input type="text" placeholder='Search Todo' value={search} name={search} onChange={handleChange} />
                <Button className='btn btn-warning'>Search</Button>
            </div>
            {/* short by value */}



        </>
    );
}

export default SearchForm;
