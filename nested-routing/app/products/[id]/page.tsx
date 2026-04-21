import React from 'react';

const ProductByID = async ({params} : { params: Promise<{ id?: string[] }> }) => {
    const {id} = await params;
    return (
        <div>
            Page {id}
        </div>
    );
};

export default ProductByID;