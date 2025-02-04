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
    <div className="w-screen min-h-[calc(90vh)]">
      {products ? (
        <ProductsList data={products} />
      ) : productsLoading ? (
        <Loading />
      ) : productsError ? (
        <div className="w-screen min-h-[calc(90vh)] flex flex-col justify-center items-center">
          <h1 className="text-5xl uppercase text-red-600 font-bold font-beauty">
            Server error fetching products
          </h1>
          <button
            onClick={() => refetchProducts}
            className="bg-black text-white px-5 py-3 rounded-full shadow-lg"
          >
            Try Again
          </button>
        </div>
      ) : (
        <div className="w-screen min-h-[calc(90vh)] flex flex-col justify-center items-center">
          <h1 className="text-5xl uppercase text-red-600 font-bold font-beauty">
            Could not fetch products
          </h1>
          <button
            onClick={() => refetchProducts}
            className="bg-black text-white px-5 py-3 rounded-full shadow-lg"
          >
            Try Again
          </button>
        </div>
      )}
    </div>
  );
}
