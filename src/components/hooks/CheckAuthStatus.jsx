import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const checkAuthStatus = async () => {
  try {
    const response = await axios.get("/api/check-auth");
    const data = await response.json();
    return data.user;
  } catch (error) {
    console.error("Failed to check authentication status:", error);
    return false;
  }
};

const useAuthStatus = () => {
  return useQuery({
    queryKey: ["status"], // Unique key for the query
    queryFn: checkAuthStatus, // The function that fetches the data
    staleTime: 5 * 60 * 1000, // Data remains fresh for 5 minutes
    cacheTime: 10 * 60 * 1000,
  });
};

export default useAuthStatus;
