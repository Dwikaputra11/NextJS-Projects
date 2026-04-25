"use client"

import {ReactNode, useState} from "react";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {Toaster} from "sonner";

export function QueryProvider({children}: {children: ReactNode}) {
  const [queryClient] = useState(() => new QueryClient());


  return (
      <QueryClientProvider client={queryClient}>
        {children}
        <Toaster />
      </QueryClientProvider>
  )
}