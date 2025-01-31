import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { getSession } from "next-auth/react";

const fetchUserData = async (email) => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_FRONTEND_URL}/api/oneUser?email=${email}`
    );
    return {
      loggedIn: true,
      userData: response.data,
    };
  } catch (error) {
    console.error("Could not fetch status: ", error);
    return {
      loggedIn: false,
      userData: null,
    };
  }
};

const useUserInfo = () => {
  return useQuery({
    queryKey: ["userSession"],
    queryFn: async () => {
      const session = await getSession();
      if (session && session.user) {
        const userInfo = await fetchUserData(session.user.email);
        return userInfo;
      } else {
        return { loggedIn: false, userData: null };
      }
    },
    staleTime: 5 * 60 * 1000,
    cacheTime: 10 * 60 * 1000,
  });
};

export default useUserInfo;
