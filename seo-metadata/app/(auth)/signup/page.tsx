import React from 'react';
import {Metadata} from "next";

export const metadata: Metadata = {
  // title: "Sign Up" // this overwrites the title base on the template in layout
  title: {
    absolute: "Sign Up Absolute", // force the page to use this title not from layout
  }
}

const SignupPage = () => {
  return (
      <div>
        Signup
      </div>
  );
};

export default SignupPage;