import React from 'react';
import Link from "next/link";

const DashboardPage = () => {
    return (
        <div>
            <h1>Dashboard</h1>
            <p><Link href={"/dashboard/reports"}>View Reports</Link></p>
            <p><Link href={"/profile"}>View Profile</Link></p>
        </div>
    );
};

export default DashboardPage;