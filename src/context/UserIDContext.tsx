import React, { createContext, useContext, useState, ReactNode } from "react";

type UserIDContextType = {
  userID: string | null;
  setUserID: (value: string | null) => void;
};

// Create the context
const UserIDContext = createContext<UserIDContextType | undefined>(undefined);

// Custom hook to consume the context
// eslint-disable-next-line react-refresh/only-export-components
export const useUserID = (): UserIDContextType => {
  const context = useContext(UserIDContext);
  if (!context) {
    throw new Error("useUserID must be used within a UserIDProvider");
  }
  return context;
};

// Context provider component
export const UserIDProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [userID, setUserID] = useState<string | null>(null);

  const value: UserIDContextType = {
    userID,
    setUserID,
  };

  return (
    <UserIDContext.Provider value={value}>{children}</UserIDContext.Provider>
  );
};
