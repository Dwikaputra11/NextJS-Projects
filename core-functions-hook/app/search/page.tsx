"use client"
import React from 'react';
import {useSearchParams} from "next/navigation";

const SearchPage = () => {
  const searchParams = useSearchParams();

  console.log(searchParams);

  const query = searchParams.get("q");
  const category = searchParams.get("category");
  const page = searchParams.get("page");

  const allparams = Array.from(searchParams.entries());
  console.log(allparams)

  return (
    <div>
      <h1>Search result for : {query}</h1>
      <p>category: {category}</p>
      <p>page: {page}</p>
    </div>
  );
};

export default SearchPage;