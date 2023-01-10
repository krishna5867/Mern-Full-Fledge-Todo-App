import React, { useState, useEffect } from 'react';
import axios from "axios";
import { Input } from "reactstrap";

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
                <Input type="text" placeholder='Search Todo' value={search} name={search} onChange={handleChange} />
            </>
        );
    }

export default SearchForm;
