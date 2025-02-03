import { UserInfoProvider } from "@/components/GlobalState";
import Structure from "@/components/Structure";

import "@/styles/globals.css";

import type { AppProps } from "next/app";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <UserInfoProvider>
        <Structure>
          <Component {...pageProps} />
        </Structure>
      </UserInfoProvider>
    </QueryClientProvider>
  );
}
