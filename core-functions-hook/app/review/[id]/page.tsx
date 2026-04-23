import React from 'react';
import {notFound} from "next/navigation";

const Review = async ({params} : {params: Promise<{id: string}>} ) => {

  const {id} = await params;

  if(parseInt(id) > 10){
    return notFound(); // render in not found page
  }

  return (
    <div>
      Review {id}
    </div>
  );
};

export default Review;