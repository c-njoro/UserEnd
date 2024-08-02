import Structure from "@/components/Structure";
import "@/styles/globals.css";
import "@/styles/header.css";
import "@/styles/home.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return <Structure children={<Component {...pageProps} />} />;
}
