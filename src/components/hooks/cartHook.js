import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import axiosRetry from "axios-retry";
import { useUserInfoProvider } from "../GlobalState";
import useUserInfo from "./UserHook";

axiosRetry(axios, { retries: 3 });

const fetchCart = async (ids) => {
  try {
    if (ids.length > 0) {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_FRONTEND_URL}/api/bulkFetch`,
        { ids } // Pass the array directly in the request body
      );
      return [...response.data];
    }

    return [];
  } catch (error) {
    console.error("Error fetching cart data:", error);
    return [];
  }
};

const useCart = () => {
  const { refetch: refetchUser } = useUserInfo();
  const { userInfo } = useUserInfoProvider();

  return useQuery({
    queryKey: ["cart", userInfo?.userData?.favoriteProducts],
    queryFn: () => {
      refetchUser();
      return fetchCart(userInfo.userData.favoriteProducts);
    },
    enabled: !!userInfo?.userData?.favoriteProducts?.length,
    staleTime: 5 * 60 * 1000,
    cacheTime: 10 * 60 * 1000,
  });
};

export default useCart;
