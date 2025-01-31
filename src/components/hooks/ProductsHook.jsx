import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import axiosRetry from "axios-retry";

const fetchProducts = async () => {
  axiosRetry(axios, { retries: 3 });

  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_FRONTEND_URL}/api/products`
  );
  const products = response.data;
  return products;
};

const useProducts = () => {
  return useQuery({
    queryKey: ["products"], // Unique key for the query
    queryFn: fetchProducts, // The function that fetches the data
    staleTime: 5 * 60 * 1000, // Data remains fresh for 5 minutes
    cacheTime: 10 * 60 * 1000,
  });
};

export default useProducts;
