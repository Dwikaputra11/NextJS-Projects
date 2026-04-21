import React from 'react';
import Link from "next/link";

const SectionPage = () => {
    return (
        <div>
            <h1>Sections</h1>
            <p><Link href={"/admin"}>Go to Admin</Link> </p>
            <p><Link href={"/settings"}>Go to Settings</Link></p>
        </div>
    );
};

export default SectionPage;