"use client"
import React from 'react';
import {useRouter} from "next/navigation";

const LoginPage = () => {
    const router = useRouter();

    const handleClick = () => {
        // router.push("/product")
        // router.replace("/product") // replace page and delete current page from history
        // router.push("/product");
        router.forward(); // go to next history
    }
    return (
        <div>
            <button onClick={handleClick}>Go To Products</button>
            <button onClick={() => {router.back()}}>Go back</button>
        </div>
    );
};

export default LoginPage;