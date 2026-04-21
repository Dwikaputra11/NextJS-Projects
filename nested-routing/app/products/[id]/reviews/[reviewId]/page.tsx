import React from 'react';

const ReviewByID = async ({params} : { params: Promise<{ id?: string[], reviewId?: string[]}> }) => {
    const {id, reviewId} = await params;
    return (
        <div>
            Page {id} {reviewId}
        </div>
    );
};

export default ReviewByID;