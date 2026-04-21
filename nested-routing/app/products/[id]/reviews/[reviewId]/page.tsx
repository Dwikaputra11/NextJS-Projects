import React from 'react';

const ReviewByID = async ({params}) => {
    const {id, reviewId} = await params;
    return (
        <div>
            Page {id} {reviewId}
        </div>
    );
};

export default ReviewByID;