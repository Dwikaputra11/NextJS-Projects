import React from 'react';
import {redirect} from "next/navigation";

const RedirectPage = () => {
  const isLogged = false;

  if(!isLogged) {
    return redirect("/login");
  }
  return (
    <div>

    </div>
  );
};

export default RedirectPage;