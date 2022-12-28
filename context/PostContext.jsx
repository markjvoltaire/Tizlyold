import { createContext, useContext, useState } from "react";

const UserContext = createContext();

function PostProvider({ children }) {
  const [postUploading, setPostUploading] = useState(false);

  return (
    <UserContext.Provider value={{ postUploading, setPostUploading }}>
      {children}
    </UserContext.Provider>
  );
}

function usePosts() {
  const context = useContext(UserContext);

  if (context === undefined) {
    throw new Error("usePosts needs to be inside the UserProvider");
  }
  return context;
}

export { PostProvider, usePosts };
