import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import HomeNavbar from "../components/HomeNavbar";
import ListUseres from "../components/Listuseres";

const UsersList = () => {
    const [data, setData] = useState()
    
    const fetchData = async () => {
        const response = await axios.get(process.env.NEXT_PUBLIC_FRONTEND_URL+'/users/me/all', {headers: 
        { Authorization: `Bearer ${localStorage.getItem('token')}` }});
        return response;
    };
    useEffect (() => {
        fetchData()
        .then((res) => {
            if (res.data)
            setData(res.data);
        })
        .catch((err) => {
            console.log(err);    
        });
    }, [])
    const [mydata, setmyData] = useState({})
    
    const fetchmyData = async () => {
        const response = await axios.get(process.env.NEXT_PUBLIC_FRONTEND_URL+'/users/me', {headers: 
        { Authorization: `Bearer ${localStorage.getItem('token')}` }});
        return response;
    };
    useEffect (() => {
        fetchmyData()
        .then((res) => {
            if (res.data)
            setmyData(res.data);
        })
        .catch((err) => {
            console.log(err);    
        });
    }, [])
    return (
        <div>
            {
                data && mydata && (
                <ListUseres data={data} mydata={mydata}/>
                )
            }
        </div>
    )
}

export default UsersList;