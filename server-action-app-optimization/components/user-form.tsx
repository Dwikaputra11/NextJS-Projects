import React from 'react';
import {createUser} from "@/actions";

const UserForm = () => {

  // async function createUser(formData) {
  //   "use server"
  //
  //   const name = formData.get("name");
  //
  //   console.log("name: ", name);
  // }


  return (
      <div>
        <form action={createUser}>
          <input type="text" name={"name"} placeholder={"Name"}/>
          <button type={"submit"}>Submit</button>
        </form>
      </div>
  );
};

export default UserForm;