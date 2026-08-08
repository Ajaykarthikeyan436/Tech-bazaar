import { createContext, useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import auth from "../config/firebase";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [firebaseToken, setFirebaseToken] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        const tokenResult = await currentUser.getIdTokenResult(true);
        const token = await currentUser.getIdToken(); // actual ID token

        setUser(currentUser);
        setIsAdmin(tokenResult.claims.admin === true);
        setFirebaseToken(token);
      } else {
        setUser(null);
        setIsAdmin(false);
        setFirebaseToken("");
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, isAdmin, firebaseToken, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
