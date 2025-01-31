import { UserInfoProvider } from "@/components/GlobalState";
import Structure from "@/components/Structure";
import "@/styles/about.css";
import "@/styles/cart.css";
import "@/styles/checkout.css";
import "@/styles/globals.css";
import "@/styles/header-footer.css";
import "@/styles/home.css";
import "@/styles/loading.css";
import "@/styles/login.css";
import "@/styles/order.css";
import "@/styles/products.css";
import "@/styles/profile.css";
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
