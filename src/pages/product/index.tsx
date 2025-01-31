import Loading from "@/components/Loading";
import ProductsList from "@/components/ProductList";
import { Inter } from "next/font/google";
import useProducts from "../../components/hooks/ProductsHook";

const inter = Inter({ subsets: ["latin"] });

export default function Products() {
  const {
    data: products,
    isLoading: productsLoading,
    error: productsError,
    refetch: refetchProducts,
  } = useProducts();
  return (
    <div>
      {products ? (
        <ProductsList data={products} />
      ) : productsLoading ? (
        <Loading />
      ) : productsError ? (
        <div>
          <h1>Error fetching products</h1>
          <button onClick={() => refetchProducts}>Refetch</button>
        </div>
      ) : (
        <div>
          <h1>Product fetch didnt happen</h1>
          <button onClick={() => refetchProducts}>Refetch</button>
        </div>
      )}
    </div>
  );
}

// export async function getServerSideProps() {
//   const productsUrl = process.env.NEXT_PUBLIC_PRODUCTS_URL;
//   const res = await fetch(`${productsUrl}`, {
//     headers: {
//       Accept: "application/json",
//       "ngrok-skip-browser-warning": "true",
//     },
//   });
//   const products = await res.json();
//   return {
//     props: {
//       products,
//     },
//   };
// }
