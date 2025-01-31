import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchUser = async (email) => {
  console.log("Querry was called");
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_FRONTEND_URL}/api/oneUser?email=${email}`
    );
    console.table(response.data);
    return {
      loggedIn: true,
      userData: response.data,
    };
  } catch (error) {
    console.error("Could not fetch status: ", error);
  }
};

const useUserInfo = (email) => {
  return useQuery({
    queryKey: ["user"], // Unique key for the query
    queryFn: fetchUser(email), // The function that fetches the data
    staleTime: 5 * 60 * 1000, // Data remains fresh for 5 minutes
    cacheTime: 10 * 60 * 1000,
  });
};

export default useUserInfo;
