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

export default function App({ Component, pageProps }: AppProps) {
  return <Structure children={<Component {...pageProps} />} />;
}
