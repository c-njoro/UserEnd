import ProductsList from "@/components/ProductList";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Products({ products }: any) {
  return (
    <div>
      <ProductsList data={products} />
    </div>
  );
}

export async function getServerSideProps() {
  const productsUrl = process.env.NEXT_PUBLIC_PRODUCTS_URL;
  const res = await fetch(`${productsUrl}`, {
    headers: {
      Accept: "application/json",
      "ngrok-skip-browser-warning": "true",
    },
  });
  const products = await res.json();
  return {
    props: {
      products,
    },
  };
}
