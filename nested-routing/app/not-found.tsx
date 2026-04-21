import React from 'react';
import Image from "next/image";
import Link from "next/link";

const NotFound = () => {
    return (
        <div className={"flex flex-col items-center justify-center h-screen text-center"}>
            <Image src={"/not-found.svg"} alt={"Not-Found-Image"} height={400} width={400} />
            <Link href={"/"} className={"rounded-lg text-white font-bold px-3 py-3 bg-indigo-500 mt-10"}>
                Back to Home
            </Link>
        </div>
    );
};

export default NotFound;