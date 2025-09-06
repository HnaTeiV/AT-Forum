import { createContext, useState, useEffect, useContext } from "react";

const LikeContext = createContext();

export function LikeProvider({ children }) {
  const [likedPosts, setLikedPosts] = useState(() => {
    // Load from localStorage first
    const saved = localStorage.getItem("likedPosts");
    return saved ? JSON.parse(saved) : [];
  });

  // Keep localStorage in sync
  useEffect(() => {
    localStorage.setItem("likedPosts", JSON.stringify(likedPosts));
  }, [likedPosts]);

  return (
    <LikeContext.Provider value={{ likedPosts, setLikedPosts }}>
      {children}
    </LikeContext.Provider>
  );
}

// Helper hook
export function useLikes() {
  return useContext(LikeContext);
}
