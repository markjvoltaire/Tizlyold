import { createContext, useContext, useState } from "react";

const UserContext = createContext();

function FollowProvider({ children }) {
  const [follow, setFollow] = useState([]);

  return (
    <UserContext.Provider value={{ follow, setFollow }}>
      {children}
    </UserContext.Provider>
  );
}

function useFollow() {
  const context = useContext(UserContext);

  if (context === undefined) {
    throw new Error("useFollow needs to be inside the UserProvider");
  }
  return context;
}

export { FollowProvider, useFollow };
