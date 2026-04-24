import React from 'react';
import Image from "next/image";

const ExampleImage = () => {
  return (
      <div className="flex flex-col items-center justify-center h-screen">
        {/*<Image src={"/vercel.svg"} alt={"Vercel Logo"} width={100} height={100}/>*/}
        <Image src={"https://media.daily.dev/image/upload/f_auto,q_auto/v1/posts/1ce3e567100dca17dd2ee56032ff88b6?_a=AQAEuop"} alt={"Vercel Logo"} width={100} height={100}/>
      </div>
  );
};

export default ExampleImage;