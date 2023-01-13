import { createContext, useContext, useState } from "react";

const LikeContext = createContext();

function LikeProvider({ children }) {
  const [likeList, setLikeList] = useState();

  return (
    <LikeContext.Provider value={{ likeList, setLikeList }}>
      {children}
    </LikeContext.Provider>
  );
}

function useLike() {
  const context = useContext(LikeContext);

  if (context === undefined) {
    throw new Error("useUser needs to be inside the UserProvider");
  }
  return context;
}

export { LikeProvider, useLike };
