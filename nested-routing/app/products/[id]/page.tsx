import React from 'react';

const ProductByID = async ({params}) => {
    const {id} = await params;
    return (
        <div>
            Page {id}
        </div>
    );
};

export default ProductByID;