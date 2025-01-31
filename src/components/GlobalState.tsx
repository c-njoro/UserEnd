import { createContext, ReactNode, useContext, useState } from "react";

type UserInfo = {
  loggedIn: boolean;
  email: string;
  userData: Record<string, any>; // Can hold any key-value pairs
};

type UserInfoContextType = {
  userInfo: UserInfo;
  setUserInfo: (newUserInfo: UserInfo) => void;
};

const UserInfoContext = createContext<UserInfoContextType | undefined>(
  undefined
);

export const UserInfoProvider = ({ children }: { children: ReactNode }) => {
  const [userInfo, setUserInfo] = useState<UserInfo>({
    loggedIn: false,
    email: "",
    userData: {}, // Default empty object
  });

  return (
    <UserInfoContext.Provider value={{ userInfo, setUserInfo }}>
      {children}
    </UserInfoContext.Provider>
  );
};

export const useUserInfoProvider = () => {
  const context = useContext(UserInfoContext);
  if (!context) {
    throw new Error("useUserInfo must be used within a UserInfoProvider");
  }
  return context;
};
