import React from 'react';

const Page = async ({params} : { params: Promise<{ slug?: string[] }> }) => {
    const {slug} = await params;
    return (
        <div>
            {slug ? slug.join("/") : "Docs"}
        </div>
    );
};


export default Page;