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
  const res = await fetch("http://localhost:3000/api/products");
  const products = await res.json();
  return {
    props: {
      products,
    },
  };
}
