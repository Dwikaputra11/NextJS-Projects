"use client"
import React from 'react';
import {useRouter} from "next/navigation";

const ProductPage = () => {
  const router = useRouter();
  return (
    <div>
      <button onClick={() => {router.back()}}>Go Back</button>
    </div>
  );
};

export default ProductPage;