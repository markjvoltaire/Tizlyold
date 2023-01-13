import { createContext, useContext, useState } from "react";

const PointsContext = createContext();

function PointsProvider({ children }) {
  const [points, setPoints] = useState();

  return (
    <PointsContext.Provider value={{ points, setPoints }}>
      {children}
    </PointsContext.Provider>
  );
}

function usePoints() {
  const context = useContext(PointsContext);

  if (context === undefined) {
    throw new Error("useUser needs to be inside the UserProvider");
  }
  return context;
}

export { PointsProvider, usePoints };
