import React from 'react';
import {Loader2} from "lucide-react";

const Loading = () => {
  return (
      <div className={"flex flex-col h-screen justify-center items-center"}>
        <Loader2 className={"size-10 animate-spin"} />
      </div>
  );
};

export default Loading;