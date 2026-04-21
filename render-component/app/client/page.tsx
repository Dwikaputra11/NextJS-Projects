"use client"

import React, {useEffect, useState} from 'react';

const ClientPage = () => {
    const [count, setCount] = useState(0);
    const [userData, setUserData] = useState({});

    useEffect(() => {
        async function fetchData(){
            const res = await fetch("https://api.github.com/users/Dwikaputra11");

            const data = await res.json();

            setUserData(data);
        }

        fetchData();
    }, []);

    const origin = window.location.origin;

    console.log("client Console", origin);

    return (
        <div>
            <h2>Client Component Counter</h2>
            <p>Count : {count}</p>
            <button onClick={() => setCount(count + 1)}>Add</button>
            <p>{JSON.stringify(userData)}</p>
            <p>{origin}</p>
        </div>
    );
};

export default ClientPage;