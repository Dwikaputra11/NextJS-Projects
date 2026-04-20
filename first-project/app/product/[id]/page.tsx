"use client"

import React, {use} from "react";

const ProductIdPage = ({params}) : React.JSX.Element => {
  const {id} = use(params);
  return (
      <div>
        <div>Page Product By Id: {id}</div>
      </div>
  );
};

export default ProductIdPage;