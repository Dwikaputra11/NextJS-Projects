// "use client"
// import {useState} from "react";

export default async function Home() {
  console.log("Home page");
  // const [state, setState] = useState();
  const res = await fetch("https://api.github.com/users/Dwikaputra11");

  const data = await res.json();

  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <p>
        {JSON.stringify(data)}
      </p>
      {/*cause error*/}
      {/*<button onClick={() => alert("Hello World!")}>*/}
      {/*  Click me*/}
      {/*</button>*/}
    </div>
  );
}
