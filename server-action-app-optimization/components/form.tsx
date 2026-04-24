"use client"
import React from 'react';
import {createUser} from "@/actions";
import {useFormState} from "react-dom";

const Form = () => {

  const [state, formAction] = useFormState(createUser, {})

  return (
      <div>
        <form action={formAction}>
          <input type="text" name={"name"} placeholder={"Name"}/>
          <button type={"submit"}>Submit</button>
          {state.error && <p>{state.error}</p>}
        </form>
      </div>
  );
};

export default Form;