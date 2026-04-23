"use client" // must define it if wanna use useParams
import React from 'react';
import {useParams} from "next/navigation";

const ProductIdSlugPage = () => {
  const params = useParams();
  console.log(params)
  return (
    <div>
      <h1>Product Id: {params.id}</h1>
      <h1>Slug: {params.slug}</h1>
    </div>
  );
};

export default ProductIdSlugPage;