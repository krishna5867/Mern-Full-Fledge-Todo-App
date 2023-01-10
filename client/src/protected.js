import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Protected = (props) => {
    const navigate = useNavigate();
    const {Component} = props

    useEffect(() => {
        let login = localStorage.getItem('token')
        if(!login){
            navigate('/signup')
        }
    });

    return (
        <div>
            <Component />
        </div>
    )
}

export default Protected;